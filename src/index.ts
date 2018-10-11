import { VideoHandler } from './videoHandler';
import { Recorder } from './recorder';

class Initialize {
  private videoHandler: VideoHandler;
  private recorder: Recorder | any;

  constructor() {
    let videoElement = document.querySelector('video');
    this.videoHandler = new VideoHandler(videoElement);
  }

  public async init() {
    let startRecordingButton = document.getElementById('btn-start-recording');
    let stopRecordingButton = document.getElementById('btn-stop-recording');

    if (startRecordingButton != null) {
      startRecordingButton.addEventListener('click', this.startRecording.bind(this));
    }
    if (stopRecordingButton != null) {
      stopRecordingButton.addEventListener('click', this.stopRecording.bind(this));
    }
  }

  private async startRecording(): Promise<void> {
    await this.videoHandler.startVideo();

    this.recorder = new Recorder(this.videoHandler.camera);
    this.recorder.startRecording();
  }

  private stopRecording(): void {
    this.recorder.stopRecording();
    this.videoHandler.stopVideo();
  }
}

const initialization = new Initialize();
initialization.init();