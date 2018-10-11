

export class VideoHandler {
  private _camera: any;

  constructor(
    private readonly videoElement: any
  ) { }

  private async captureCamera(): Promise<{}> {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      })
      .then((camera) => {
        this._camera = camera;
        resolve();
      })
      .catch((error) => {
        reject(error);
      })
    });
  }

  public async startVideo(): Promise<void> {
    await this.captureCamera();
    this.videoElement.srcObject = this.camera;
    this.videoElement.play();
  }

  public stopVideo(): void {
    this.videoElement.pause();
    this.videoElement.srcObject = null;
    this.camera.stop();
  }

  get camera(): any {
    return this._camera;
  }

}