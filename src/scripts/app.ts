
import { Vector } from 'vector2d';
import { Engine } from './engine';
import { Fps } from './fps';
import { Segments } from './segments';

class OnlimCC3 {

  private engine: Engine;

  private fps: Fps;

  private segments: Segments;

  private target: Vector;

  constructor() {
    this.engineSetup();

    this.fpsSetup();

    this.segmentsSetup();

    this.targetSetup();

    this.mouseSetup();
  }

  private engineSetup(): void {
    this.engine = new Engine(
      'onlim_coding-challenge-3',
      800,
      600,
      60
    );
  }

  private fpsSetup(): void {
    this.fps = new Fps(this.engine, 500);
  }

  private segmentsSetup(): void {
    this.segments = new Segments(this.engine.graphics);
  }

  private targetSetup(): void {
    this.target = new Vector(0, 0);
  }

  private mouseSetup(): void {
    this.engine.renderer.view.onmousemove = this.mouseHandle.bind(this);
  }

  private mouseHandle(mouseEvent: MouseEvent): void {
    this.target.setX(mouseEvent.offsetX);
    this.target.setY(mouseEvent.offsetY);
  }

  public create(): void {
    this.segments.add(20, 40, 60, 80, 100);

    this.createInternal();
  }

  private createInternal(): void {
    setInterval(this.update.bind(this), 1000.0 / this.engine.fpsMax);

    this.render();
  }

  private update(): void {
    this.segments.update(this.target);

    this.updateInternal();
  }

  private updateInternal(): void {
    this.fps.updateTime();
  }

  private render(): void {
    this.segments.render();

    this.renderInternal();
  }

  private renderInternal(): void {
    requestAnimationFrame(this.render.bind(this));

    this.engine.renderer.render(this.engine.graphics);

    this.fps.tick();
  }

}

const app = new OnlimCC3();

window.onload = app.create.bind(app);
