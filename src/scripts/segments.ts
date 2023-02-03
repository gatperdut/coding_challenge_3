import * as PIXI from 'pixi.js';
import { Vector } from 'vector2d';
import { Segment } from "./segment";

export class Segments {

  private segments: Segment[];

  private last: Vector = new Vector(400, 300);

  private colors: number[] = [0x000000, 0x0000FF, 0x00FF00, 0x00FFFF, 0xFF0000, 0xFF00FF, 0xFFFF00, 0xFFFFFF];

  constructor(
    private graphics: PIXI.Graphics
  ) {
    this.segmentsSetup();
  }

  private segmentsSetup(): void {
    this.segments = [];
  }

  public update(target: Vector): void {
    this.segments
    .forEach(
      (segment: Segment, index: number): void => {
        if (index > 0) {
          segment.update(this.segments[index - 1].a);
        }
        else {
          segment.update(target);
        }
      }
    );
  }

  public render(): void {
    this.segments.forEach(
      (segment: Segment): void => {
        segment.draw();
      }
    );
  }

  public add(...lengths: number[]): void {
    lengths.forEach(
      (length: number): void => {
        const segment: Segment = new Segment(
          this.graphics,
          this.last.x,
          this.last.y,
          length,
          this.colors[this.segments.length % this.colors.length]
        );

        this.segments.push(segment);

        this.last.x += length;
        console.log(this.last.x);
      }
    );
  }

}
