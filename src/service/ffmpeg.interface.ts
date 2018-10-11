
export interface IFfmpeg {
  transcodeSegment(blob: Blob, segmentNumber: number): Promise<void>;
}