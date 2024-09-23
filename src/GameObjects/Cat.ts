import {
  CameraContext,
  CollisionBody,
  RectangleCollisionShape,
  Vector2D,
} from "jf-canvas-game-engine";
import CatNecklace from "./CatNecklace";
import { Bullet } from "./Bullet";

export default class Cat extends CollisionBody {
  #name: string;
  #color: string | CanvasPattern | CanvasGradient;
  #width: number = 50;
  #height: number = 50;
  #left: boolean = false;
  #up: boolean = false;
  #right: boolean = false;
  #down: boolean = false;
  #velocity = new Vector2D(0, 0);

  constructor(
    position: Vector2D,
    name: string,
    color: string | CanvasPattern | CanvasGradient
  ) {
    const width = 50;
    const height = 50;
    super(
      position,
      new RectangleCollisionShape(
        new Vector2D(-width / 2, -height / 2),
        width,
        height
      )
    );
    this.#name = name;
    this.#color = color;

    document.querySelector("canvas")!.addEventListener("click", (e) => {
      const clickPosition = new Vector2D(
        e.clientX -
          document.querySelector("canvas")!.getBoundingClientRect().left,
        e.clientY -
          document.querySelector("canvas")!.getBoundingClientRect().top
      ).add(
        CameraContext.getInstance().getCamera()?.position || new Vector2D(0, 0)
      );
      const direction = clickPosition.subtract(this.globalPosition).normalize();
      console.log(
        `${this.#name} shoots in direction ${direction.x}, ${direction.y}`
      );
      this.addChild(new Bullet(direction.multiply(5), 500, direction, "black"));
    });

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.#left = true;
          break;
        case "w":
          this.#up = true;
          break;
        case "d":
          this.#right = true;
          break;
        case "s":
          this.#down = true;
          break;
        case " ":
          console.log(`${this.#name} meows`);
          break;
        default:
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
          this.#left = false;
          break;
        case "w":
          this.#up = false;
          break;
        case "d":
          this.#right = false;
          break;
        case "s":
          this.#down = false;
          break;
      }
    });

    this.addChild(new CatNecklace(new Vector2D(0, -10), "red"));
  }

  process(delta: number) {
    const speed = 1000;
    if (this.#up) {
      this.#velocity = this.#velocity.add(new Vector2D(0, -speed));
    }
    if (this.#down) {
      this.#velocity = this.#velocity.add(new Vector2D(0, speed));
    }
    if (this.#left) {
      this.#velocity = this.#velocity.add(new Vector2D(-speed, 0));
    }
    if (this.#right) {
      this.#velocity = this.#velocity.add(new Vector2D(speed, 0));
    }

    this.position = this.position.add(this.#velocity.multiply(delta / 1000));
    const camera = CameraContext.getInstance().getCamera();
    camera?.centerOn(this.globalPosition);
    this.#velocity = new Vector2D(0, 0);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(
      this.globalPosition.x - this.#width / 2,
      this.globalPosition.y - this.#height / 2,
      this.#width,
      this.#height
    );
    // draw position of the cat as a black dot
    ctx.fillStyle = "black";
    ctx.fillRect(this.globalPosition.x, this.globalPosition.y, 3, 3);
  }

  onCollision(other: CollisionBody) {
    if (this.getAllChildren().includes(other)) {
      return;
    }
    super.onCollision(other);
  }
}
