
import { IFfmpeg } from './service';
import { Uploader } from './uploader';

export class Ffmpeg implements IFfmpeg {

  private readonly workerName = 'node_modules/ffmpeg.js/ffmpeg-worker-mp4.js';

  constructor(
  ) { }

  public async transcodeSegment(blob: Blob, segmentNumber: number): Promise<void> {
    const worker = new Worker(this.workerName);
    let arrayBuffer = await this.getArrayBuffer(blob);
    let segmentName = `file-${segmentNumber}.mp4`;
    let uploader = new Uploader();

    worker.onmessage = (e) => {
      let message = e.data;
      switch (message.type) {
        case 'ready':
          this.postMessage(worker, arrayBuffer, segmentName);
          break;
        case 'stdout':
          console.log(message.data);
          break;
        case 'stderr':
          console.log(message.data);
          break;
        case 'done':
          let memfs = message.data.MEMFS.pop();

          if (memfs === undefined) return;

          let transcodedBlob = new Blob(
            [memfs.data],
            { type: 'video/mp4' }
          );
          let transcodedFilename = memfs.name;
          delete message.data;
          message = '';
          uploader.upload(transcodedBlob, transcodedFilename);
          worker.terminate();
          break;
        case 'exit':
          console.log(`Stopped transcoding segment ${segmentName}`);
          break;
      }
    }
  }

  private postMessage(worker: Worker, arrayBuffer: ArrayBuffer, segmentName: string): void {
    let webmName = segmentName.replace('mp4', 'webm');
    worker.postMessage({
      type: 'run',
      TOTAL_MEMORY: 268435456,
      MEMFS: [{ name: webmName, data: arrayBuffer }],
      arguments: ['-y', '-i', webmName, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '384k', segmentName]
    });
  }

  private async getArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    let fileReader = new FileReader();
    let promise = new Promise((resolve, reject) => {
      fileReader.onloadend = (event) => {
        if (fileReader.result !== null) {
          resolve(fileReader.result);
        }
        else {
          console.log('Array buffer rejected');
          reject();
        }
      }
    });
    fileReader.readAsArrayBuffer(blob);
    return promise as Promise<ArrayBuffer>;
  }

}
