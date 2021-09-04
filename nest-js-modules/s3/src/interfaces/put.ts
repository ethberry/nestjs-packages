export interface IS3PutSignedDto {
  objectName: string;
  contentType: string;
  bucket?: string;
}

export interface IS3PutDto {
  contentType: string;
  bucket?: string;
  content: Buffer;
}
