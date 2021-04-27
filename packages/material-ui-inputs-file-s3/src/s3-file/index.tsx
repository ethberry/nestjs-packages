import React, {FC, useCallback, useContext} from "react";
import "react-s3-uploader"; // this is required for types
import S3Upload from "react-s3-uploader/s3upload";
import {ApiContext} from "@trejgun/provider-api";

import {FileInput, IFileInputProps} from "@trejgun/material-ui-inputs-file";

export interface IS3Result {
  signedUrl: string;
}

interface IS3FileInputProps extends Omit<IFileInputProps, "onChange"> {
  onProgress?: (percent: number, status: string, file: File) => void;
  onChange: (url: string) => void;
}

export const S3FileInput: FC<IS3FileInputProps> = props => {
  const {onChange, onProgress, ...rest} = props;

  const api = useContext(ApiContext);

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const authToken = `Bearer ${api.getToken().accessToken}`;

  const handleChange = useCallback((files: Array<File>): void => {
    // eslint-disable-next-line no-new
    new S3Upload({
      files,
      signingUrl: "/s3/put",
      onFinishS3Put: (data: IS3Result) => {
        onChange(
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `https://${process.env.AWS_S3_BUCKET}.s3-${process.env.AWS_REGION}.amazonaws.com${
            new URL(data.signedUrl).pathname
          }`,
        );
      },
      onProgress: onProgress,
      onError: console.error,
      signingUrlMethod: "GET",
      signingUrlWithCredentials: true,
      server: process.env.BE_URL,
      signingUrlHeaders: {
        // @ts-ignore: Unreachable code error
        authorization: authToken,
      },
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return <FileInput onChange={handleChange} {...rest} />;
};
