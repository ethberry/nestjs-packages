import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { v4 } from "uuid";
import { S3 } from "aws-sdk";

import { IS3DeleteDto, IS3GetSignedDto, IS3Options, IS3PutDto, IS3PutSignedDto, IS3Result } from "./interfaces";
import { S3_OPTIONS_PROVIDER } from "./s3.constants";

@Injectable()
export class S3Service {
  private client: S3;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(S3_OPTIONS_PROVIDER)
    private readonly options: IS3Options,
  ) {
    const { accessKeyId, secretAccessKey, region } = options;
    this.client = new S3({ accessKeyId, secretAccessKey, region });
  }

  public getSignedObject(dto: IS3GetSignedDto): Promise<IS3Result> {
    const { objectName, bucket = this.options.bucket } = dto;

    const params = {
      Bucket: bucket,
      Key: objectName,
    };

    return this.client.getSignedUrlPromise("getObject", params).then((signedUrl: string) => ({
      signedUrl,
    }));
  }

  public putSignedObject(dto: IS3PutSignedDto): Promise<IS3Result> {
    const { contentType, bucket = this.options.bucket } = dto;

    const filename = `${v4()}.${contentType.split("/")[1]}`;

    const params = {
      Bucket: bucket,
      Key: filename,
      Expires: 60,
      ContentType: contentType,
      ACL: "public-read",
    };

    return this.client.getSignedUrlPromise("putObject", params).then((signedUrl: string) => ({
      signedUrl,
    }));
  }

  public async putObject(dto: IS3PutDto): Promise<string> {
    const { contentType, bucket = this.options.bucket, content } = dto;

    const filename = `${v4()}.${contentType.split("/")[1]}`;

    await this.client
      .putObject({
        Bucket: bucket,
        Key: filename,
        Body: content,
        ContentType: contentType,
      })
      .promise();

    return `https://${bucket}.s3.${this.options.region}.amazonaws.com/${filename}`;
  }

  public deleteObject(dto: IS3DeleteDto): Promise<any> {
    const { objectName, bucket = this.options.bucket } = dto;
    const params = {
      Bucket: bucket,
      Key: objectName,
    };

    return this.client.deleteObject(params).promise();
  }
}
