import { GameObject, Vector2D } from "jf-canvas-game-engine";

export class CatNecklace extends GameObject {
  #color: string;
  constructor(color: string, position?: Vector2D) {
    super();
    this.#color = color;
    if (position) {
      this.position = position;
    } else {
      this.position = new Vector2D(0, 0);
    }
  }

  render(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.position.x, this.position.y, 50, 5);
  }
}
