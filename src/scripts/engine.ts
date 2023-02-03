import * as PIXI from 'pixi.js';

export type EngineParams = {
  containerId: string,
  canvasW: number,
  canvasH: number,
  fpsMax: number
}

export class Engine {

  public renderer:  PIXI.Renderer;

  public graphics:  PIXI.Graphics;

  public container: HTMLElement;

  constructor(
    public readonly containerId: string,
    public readonly width: number,
    public readonly height: number,
    public readonly fpsMax: number
  ) {
    this.rendererSetup();

    this.graphicsSetup();

    this.containerSetup();
  }

  private rendererSetup(): void {
    this.renderer = PIXI.autoDetectRenderer(
      {
        width:  this.width,
        height: this.height,
        antialias: true,
        backgroundColor: 0xEEEEEE
      }
    );
  }

  private graphicsSetup(): void {
    this.graphics = new PIXI.Graphics();
  }

  private containerSetup(): void {
    this.container = document.getElementById(this.containerId) || document.body;
    this.container.appendChild(this.renderer.view);
  }
}
