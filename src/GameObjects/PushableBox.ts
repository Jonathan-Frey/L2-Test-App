import {
  CollisionBody,
  CollisionLayers,
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
    const collisionLayers = new CollisionLayers();
    collisionLayers.setLayer(2, true);
    super(
      position,
      new RectangleCollisionShape(new Vector2D(0, 0), width, height),
      collisionLayers
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
}
