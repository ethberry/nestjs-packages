import React, { FC } from "react";
import firebase from "@gemunion/firebase";

import { FileInput, IFileInputProps } from "@gemunion/material-ui-inputs-file";

export interface IFirebaseFileInputProps extends Omit<IFileInputProps, "onChange"> {
  onChange: (urls: Array<string>) => void;
}

export const FirebaseFileInput: FC<IFirebaseFileInputProps> = props => {
  const { onChange, ...rest } = props;

  const handleChange = async (files: File[]): Promise<void> => {
    const storageRef = firebase.storage().ref();
    const snapshots = await Promise.all(files.map(file => storageRef.child(`${Date.now()}-${file.name}`).put(file)));
    const urls = await Promise.all(snapshots.map(snapshot => snapshot.ref.getDownloadURL()));
    onChange(urls);
  };

  return <FileInput onChange={handleChange} {...rest} />;
};
