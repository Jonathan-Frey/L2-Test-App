import {
  CollisionBody,
  RectangleCollisionShape,
  Vector2D,
} from "jf-canvas-game-engine";

export class Bullet extends CollisionBody {
  #speed: number;
  #direction: Vector2D;
  #color: string | CanvasPattern | CanvasGradient;
  constructor(
    position: Vector2D,
    speed: number,
    direction: Vector2D,
    color: string | CanvasPattern | CanvasGradient
  ) {
    super(position, new RectangleCollisionShape(new Vector2D(0, 0), 5, 5));
    this.#speed = speed;
    this.#direction = direction;
    this.#color = color;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.globalPosition.x, this.globalPosition.y, 5, 5);
  }

  override process(delta: number): void {
    this.position = this.position.add(
      this.#direction.multiply((delta / 1000) * this.#speed)
    );
  }

  onCollision(other: CollisionBody) {
    if (other === this.getParent()) {
      return;
    }
    if (other.hasMethod("onHit")) {
      other.onhit();
    }
    this.getParent()?.removeChild(this);
  }
}
