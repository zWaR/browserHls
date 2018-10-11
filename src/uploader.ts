import { IUploader } from './service';

export class Uploader implements IUploader {

  async upload(uploadBlob: Blob, filename: string): Promise<void> {
    console.log(`Uploading ${filename}`);
  }

}