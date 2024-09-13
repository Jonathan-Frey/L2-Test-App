import { GameObject } from "jf-canvas-game-engine";

export default class Cat extends GameObject {
  #name: string;
  #color: string;
  #totalTime: number = 0;
  #x;
  #y;
  #left: boolean = false;
  #up: boolean = false;
  #right: boolean = false;
  #down: boolean = false;

  constructor(x: number, y: number, name: string, color: string) {
    super();
    this.#name = name;
    this.#color = color;
    this.#x = x;
    this.#y = y;
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
  }

  protected override process(delta: number) {
    if (this.#left && this.#up) {
      this.#x -= 20 / Math.sqrt(2);
      this.#y -= 20 / Math.sqrt(2);
    } else if (this.#left && this.#down) {
      this.#x -= 20 / Math.sqrt(2);
      this.#y += 20 / Math.sqrt(2);
    } else if (this.#right && this.#up) {
      this.#x += 20 / Math.sqrt(2);
      this.#y -= 20 / Math.sqrt(2);
    } else if (this.#right && this.#down) {
      this.#x += 20 / Math.sqrt(2);
      this.#y += 20 / Math.sqrt(2);
    } else if (this.#left && this.#right) {
    } else if (this.#up && this.#down) {
    } else if (this.#left) {
      this.#x -= 20;
    } else if (this.#up) {
      this.#y -= 20;
    } else if (this.#right) {
      this.#x += 20;
    } else if (this.#down) {
      this.#y += 20;
    }
  }

  protected override render(delta: number, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.#x, this.#y, 50, 50);
  }
}
