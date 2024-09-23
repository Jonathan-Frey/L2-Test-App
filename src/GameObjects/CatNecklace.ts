import { GameObject, Vector2D } from "jf-canvas-game-engine";

export default class CatNecklace extends GameObject {
  #color: string | CanvasPattern | CanvasGradient;
  #width: number = 50;
  #height: number = 5;
  constructor(
    position: Vector2D,
    color: string | CanvasPattern | CanvasGradient
  ) {
    super(position);
    this.#color = color;
    if (position) {
      this.position = position;
    } else {
      this.position = new Vector2D(0, 0);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(
      this.globalPosition.x - this.#width / 2,
      this.globalPosition.y - this.#height / 2,
      this.#width,
      this.#height
    );
  }
}
