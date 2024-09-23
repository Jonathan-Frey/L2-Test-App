import {
  CollisionBody,
  RectangleCollisionShape,
  Vector2D,
} from "jf-canvas-game-engine";

export default class PushableBox extends CollisionBody {
  #width: number;
  #height: number;
  #color: string | CanvasPattern | CanvasGradient;
  constructor(
    position: Vector2D,
    width: number,
    height: number,
    color: string | CanvasPattern | CanvasGradient
  ) {
    super(
      position,
      new RectangleCollisionShape(new Vector2D(0, 0), width, height)
    );
    this.#color = color;
    this.#width = width;
    this.#height = height;
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

  override onCollision(other: CollisionBody): void {
    super.onCollision(other);
    this.getParent()?.removeChild(this);
  }
}
