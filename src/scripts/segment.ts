import * as PIXI from 'pixi.js';
import { Vector } from 'vector2d';

export class Segment {

  public a: Vector;

  public b: Vector;

  public line: PIXI.Graphics;

  public dot: PIXI.Graphics;

  public angleD: number;

  public angleR: number;

  constructor(
    private graphics: PIXI.Graphics,
    x: number,
    y: number,
    public length: number,
    public color: number
  ) {
    this.angleD = 0;

    this.angleRCalc();

    this.a = new Vector(x, y);

    this.bSetup();

    this.bCalc();

    this.graphicsSetup();
  }

  private angleRCalc(): void {
    this.angleR = this.angleD * (Math.PI / 180.0);
  }
  private angleDCalc(): void {
    this.angleD = this.angleR * (180.0 / Math.PI);
  }

  private bSetup(): void {
    this.b = new Vector(0, 0);

    this.bCalc();
  }

  private bCalc(): void {
    this.b.setX(
      this.a.x + this.length * Math.cos(this.angleR)
    );

    this.b.setY(
      this.a.y + this.length * Math.sin(this.angleR)
    );
  }

  private graphicsSetup(): void {
    this.graphicsLineSetup();

    this.graphicsDotSetup();
  }

  private graphicsLineSetup(): void {
    this.line = new PIXI.Graphics();

    this.graphics.addChild(this.line);
  }

  private graphicsDotSetup(): void {
    this.dot = new PIXI.Graphics()

    this.graphics.addChild(this.dot);
  }

  public update(target: Vector): void {
    const dir: Vector = (target.clone() as Vector).subtract(this.a);

    this.angleR = Math.atan2(dir.y, dir.x)

    this.angleDCalc();

    dir.normalize().mulS(-this.length);

    this.a = (target.clone() as Vector).add(dir);

    this.bCalc();
  }

  public draw(): void {
    this.drawLine();

    this.drawDot();
  }

  private drawLine(): void {
    this.line
    .clear()
    .lineStyle(
      2,
      this.color
    )
    .moveTo(this.a.x, this.a.y)
    .lineTo(this.b.x, this.b.y);
  }

  private drawDot(): void {
    this.dot
    .clear()
    .beginFill(0xFF0000)
    .drawCircle(this.a.x, this.a.y, 3)
    .endFill();
  }

}
