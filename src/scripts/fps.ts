import { Engine } from "./engine";

export class Fps {

  private framesCount: number;

  private elapsedTime: number;

  private previousTime: number;

  private htmlElement: HTMLElement;

  constructor(
    private engine: Engine,
    private refreshDelay: number
  ) {
    this.reset();

    this.htmlElementSetup();
  }

  private htmlElementSetup(): void {
    this.htmlElement = document.createElement('div');

    this.htmlElement.classList.add('fps');

    this.engine.container.appendChild(this.htmlElement);
  }

  public updateTime(): void {
    this.elapsedTime = performance.now() - this.previousTime;
  }

  public tick(): void {
    this.framesCount++;

    if (this.elapsedTime > this.refreshDelay) {
      this.htmlElement.innerHTML = 'FPS: ' + this.getFrameRate().toFixed(2).toString();

      this.reset();
    }
  }

  public reset(): void {
    this.framesCount = 0;

    this.elapsedTime = 0;

    this.previousTime = performance.now();
  }

  public getFrameRate(): number {
    return 1000.0 * this.framesCount / this.elapsedTime;
  }

}
