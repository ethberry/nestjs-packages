export interface IS3PutDto {
  contentType: string;
  bucket?: string;
  content: Buffer;
}
