import { GameObject, Vector2D } from "jf-canvas-game-engine";

export default class Floor extends GameObject {
  #width: number;
  #height: number;
  #color: string | CanvasPattern | CanvasGradient;
  constructor(
    position: Vector2D,
    width: number,
    height: number,
    color: string | CanvasPattern | CanvasGradient
  ) {
    super(position);
    this.#width = width;
    this.#height = height;
    this.#color = color;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(
      this.globalPosition.x,
      this.globalPosition.y,
      this.#width,
      this.#height
    );
  }
}
