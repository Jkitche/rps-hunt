export class FrameTimeAnalyzer {
  private lastFrameTime: number;
  private frameTimes: number[];
  private maxFrameTimesToKeep: number;

  constructor(maxFrameTimesToKeep: number = 60) {
    this.lastFrameTime = 0;
    this.frameTimes = [];
    this.maxFrameTimesToKeep = maxFrameTimesToKeep;
  }

  startFrame() {
    this.lastFrameTime = performance.now();
  }

  endFrame() {
    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;

    this.frameTimes.push(frameTime);

    // Limit the number of frame times to keep
    if (this.frameTimes.length > this.maxFrameTimesToKeep) {
      this.frameTimes.shift();
    }
  }

  getAverageFrameTime(): number {
    if (this.frameTimes.length === 0) {
      return 0;
    }

    const totalFrameTime = this.frameTimes.reduce(
      (acc, frameTime) => acc + frameTime,
      0
    );
    return totalFrameTime / this.frameTimes.length;
  }
}
