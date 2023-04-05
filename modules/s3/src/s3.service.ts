import { Inject, Injectable, Logger, LoggerService } from "@nestjs/common";
import { v4 } from "uuid";
import {
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { extension } from "mime-types";

import {
  IS3DeleteDto,
  IS3GetDto,
  IS3GetSignedDto,
  IS3Options,
  IS3PutDto,
  IS3PutSignedDto,
  IS3Result,
} from "./interfaces";
import { S3_OPTIONS_PROVIDER } from "./s3.constants";

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor(
    @Inject(Logger)
    private readonly loggerService: LoggerService,
    @Inject(S3_OPTIONS_PROVIDER)
    private readonly options: IS3Options,
  ) {
    const { accessKeyId, secretAccessKey, region } = options;
    this.s3Client = new S3Client({ credentials: { accessKeyId, secretAccessKey }, region });
  }

  public getSignedObject(dto: IS3GetSignedDto): Promise<IS3Result> {
    const { objectName, bucket = this.options.bucket } = dto;

    const params = {
      Bucket: bucket,
      Key: objectName,
    };

    const command = new GetObjectCommand(params);
    return getSignedUrl(this.s3Client, command).then((signedUrl: string) => ({
      signedUrl,
    }));
  }

  public putSignedObject(dto: IS3PutSignedDto): Promise<IS3Result> {
    const { contentType, bucket = this.options.bucket } = dto;

    const filename = `${v4()}.${extension(contentType) as string}`;

    const params = {
      expiresIn: 60,
      unhoistableHeaders: new Set(["x-amz-acl"]),
    };

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      ContentType: contentType,
      ACL: "public-read",
    });

    return getSignedUrl(this.s3Client, command, params).then((signedUrl: string) => ({
      signedUrl,
    }));
  }

  public async putObject(dto: IS3PutDto): Promise<string> {
    const { contentType, bucket = this.options.bucket, content } = dto;

    const filename = `${v4()}.${contentType.split("/")[1]}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: content,
      ContentType: contentType,
    });

    await this.s3Client.send(command);

    return `https://${bucket}.s3.${this.options.region}.amazonaws.com/${filename}`;
  }

  public getObject(dto: IS3GetDto): Promise<GetObjectCommandOutput> {
    const { objectName, bucket = this.options.bucket } = dto;
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: objectName,
    });

    return this.s3Client.send(command);
  }

  // TODO test stream!
  public async getObjectAsStream(dto: IS3GetDto): Promise<ReadableStream> {
    const { objectName, bucket = this.options.bucket } = dto;
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: objectName,
    });

    const objectData = await this.s3Client.send(command);
    if (!objectData.Body) {
      // handle error
      throw new Error("S3.getObjectAsStream error");
    } else {
      return objectData.Body.transformToWebStream();
    }
  }

  public deleteObject(dto: IS3DeleteDto): Promise<DeleteObjectCommandOutput> {
    const { objectName, bucket = this.options.bucket } = dto;
    const command = new DeleteObjectCommand({
      Bucket: bucket,
      Key: objectName,
    });

    return this.s3Client.send(command);
  }
}
