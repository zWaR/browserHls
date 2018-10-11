
export interface IUploader {

  upload (uploadBlob: Blob, filename: string): Promise<void>

}