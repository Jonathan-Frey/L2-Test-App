import {
  GameObject,
  Vector2D,
  Area,
  RectangleCollisionShape,
} from "jf-canvas-game-engine";
import Cat from "./Cat";

export class Bullet extends GameObject {
  #area: Area;
  #speed: number;
  #direction: Vector2D;
  #color: string | CanvasPattern | CanvasGradient;
  constructor(
    position: Vector2D,
    speed: number,
    direction: Vector2D,
    color: string | CanvasPattern | CanvasGradient
  ) {
    super(position);
    this.#area = new Area(
      new Vector2D(0, 0),
      new RectangleCollisionShape(new Vector2D(0, 0), 5, 5)
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
    this.position = this.position.add(
      this.#direction.multiply((delta / 1000) * this.#speed)
    );
    this.#area.getCollidingBodies().forEach((body) => {
      console.log("Collided with: ", body);
      if (body instanceof Bullet) return;
      if (body instanceof Cat) return;
      body.getParent()?.removeChild(body);
    });
  }
}
