
import { Ffmpeg } from './ffmpeg';

const recordRtc: any = require('recordrtc');
const fileSaver: any = require('file-saver');

export class Recorder {

  private segmentCount = 0;

  private recordingOptions = {
    mediaType: recordRtc.MediaStreamRecorder,
    mimeType: 'video/webm\;codecs=h264',
    audioBitsPerSecond: 128000,
    videoBitsPerSecond: 128000,
    timeSlice: 10000,
    ondataavailable: this.onDataAvailableHandler.bind(this)
  };

  private recorder: any;

  constructor(
    private readonly camera: any,
  ) {
  }

  public startRecording(): void {
    this.recorder = new recordRtc(this.camera, this.recordingOptions);
    this.recorder.startRecording();
    this.recorder = this.camera;
  }

  public stopRecording(): void {
    this.recorder = null;
  }

  private async onDataAvailableHandler(blob: Blob): Promise<void> {
    const ffmpeg = new Ffmpeg();
    console.log('onDataAvailableHandler!');

    this.segmentCount++;

    await ffmpeg.transcodeSegment(blob, this.segmentCount);
  }

}
