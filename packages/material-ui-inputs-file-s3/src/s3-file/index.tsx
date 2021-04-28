import React, {FC, useCallback, useContext} from "react";
import "react-s3-uploader"; // this is required for types
import S3Upload from "react-s3-uploader/s3upload";
import {ApiContext, IApiContext, IAuth} from "@trejgun/provider-api";

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

  const api = useContext<IApiContext<IAuth>>(ApiContext);

  const handleChange = useCallback((files: Array<File>): void => {
    // @ts-ignore
    const authToken = api.getToken().accessToken;

    // eslint-disable-next-line no-new
    new S3Upload({
      files,
      signingUrl: "/s3/put",
      onFinishS3Put: (data: IS3Result) => {
        onChange(
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
        // @ts-ignore
        authorization: authToken ? `Bearer ${authToken}` : "",
      },
    });
  }, []);

  return <FileInput onChange={handleChange} {...rest} />;
};
