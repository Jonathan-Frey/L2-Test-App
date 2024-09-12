import { GameObject } from "jf-canvas-game-engine";

export default class Cat extends GameObject {
  #name: string;
  #color: string;
  #totalTime: number = 0;

  constructor(name: string, color: string) {
    super();
    this.#name = name;
    this.#color = color;
  }

  protected override process(delta: number) {
    this.#totalTime += delta;
    if (Math.floor(this.#totalTime) % 2 === 0) {
      console.log(
        `Hello! I am a cat named ${this.#name} and am the color ${this.#color}`
      );
    }
  }
}
