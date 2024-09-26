import {
  GameContext,
  CollisionBody,
  RectangleCollisionShape,
  Vector2D,
  Camera,
} from "jf-canvas-game-engine";
import CatNecklace from "./CatNecklace";
import { Bullet } from "./Bullet";

export default class Cat extends CollisionBody {
  #name: string;
  #color: string | CanvasPattern | CanvasGradient;
  #width: number = 50;
  #height: number = 50;
  #camera: Camera;
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
    this.#camera = new Camera(new Vector2D(0, 0));
    this.addChild(this.#camera);
    GameContext.getInstance().setActiveCamera(this.#camera);
    this.addChild(new CatNecklace(new Vector2D(0, -10), "red"));

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
  }

  process(delta: number) {
    if (GameContext.getInstance().isMouseClicked()) {
      const clickPosition =
        GameContext.getInstance().getClickData()?.globalPosition;
      if (clickPosition) {
        const direction = clickPosition
          .subtract(this.globalPosition)
          .normalize();
        this.getParent()?.addChild(
          new Bullet(
            this.position.add(direction.multiply(5)),
            500,
            direction,
            "black"
          )
        );
      }
    }
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
}
