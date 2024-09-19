import { CameraContext, GameObject, Vector2D } from "jf-canvas-game-engine";
import CatNecklace from "./CatNecklace";

export default class Cat extends GameObject {
  #name: string;
  #color: string;
  #totalTime: number = 0;
  #left: boolean = false;
  #up: boolean = false;
  #right: boolean = false;
  #down: boolean = false;
  #velocity = new Vector2D(0, 0);

  constructor(
    name: string,
    color: string,
    fixed: boolean = false,
    position: Vector2D = new Vector2D(0, 0)
  ) {
    super(fixed, position);
    this.#name = name;
    this.#color = color;
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.#left = true;
          break;
        case "ArrowUp":
          this.#up = true;
          break;
        case "ArrowRight":
          this.#right = true;
          break;
        case "ArrowDown":
          this.#down = true;
          break;
        case " ":
          console.log("meow");
          break;
        case "Enter":
          const cat3 = new Cat(
            "Crippa",
            "black",
            false,
            new Vector2D(100, 100)
          );
          this.navigateTo(cat3);
          break;
        default:
          break;
      }
    });

    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.#left = false;
          break;
        case "ArrowUp":
          this.#up = false;
          break;
        case "ArrowRight":
          this.#right = false;
          break;
        case "ArrowDown":
          this.#down = false;
          break;
      }
    });

    this.addChild(new CatNecklace("red", new Vector2D(0, 20)));
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
    ctx.fillRect(this.globalPosition.x, this.globalPosition.y, 50, 50);
  }
}
