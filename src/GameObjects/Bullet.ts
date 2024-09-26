import {
  GameObject,
  Vector2D,
  Area,
  RectangleCollisionShape,
  CollisionLayers,
} from "jf-canvas-game-engine";
import Cat from "./Cat";

export class Bullet extends GameObject {
  #area: Area;
  #speed: number;
  #direction: Vector2D;
  #color: string | CanvasPattern | CanvasGradient;
  #lifeTimeInMilliseconds: number = 1000;
  constructor(
    position: Vector2D,
    speed: number,
    direction: Vector2D,
    color: string | CanvasPattern | CanvasGradient
  ) {
    super(position);
    const collisionLayers = new CollisionLayers();
    collisionLayers.setLayer(1, false);
    collisionLayers.setLayer(2, true);
    this.#area = new Area(
      new Vector2D(0, 0),
      new RectangleCollisionShape(new Vector2D(0, 0), 5, 5),
      collisionLayers
    );
    this.addChild(this.#area);
    this.#speed = speed;
    this.#direction = direction;
    this.#color = color;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.globalPosition.x, this.globalPosition.y, 5, 5);
  }

  override process(delta: number): void {
    this.#lifeTimeInMilliseconds -= delta;
    if (this.#lifeTimeInMilliseconds <= 0) {
      this.getParent()?.removeChild(this);
    }
    this.position = this.position.add(
      this.#direction.multiply((delta / 1000) * this.#speed)
    );
    this.#area.getCollidingBodies().forEach((body) => {
      if (body instanceof Bullet) return;
      body.getParent()?.removeChild(body);
      this.getParent()?.removeChild(this);
    });
  }
}
