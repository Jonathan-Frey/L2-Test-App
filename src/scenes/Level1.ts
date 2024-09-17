import { GameObject, Rectangle, Vector2D } from "jf-canvas-game-engine";
import Cat from "../gameObjects/Cat";

export class Level1 extends GameObject {
  constructor() {
    super();
    this.addChild(new Rectangle(1000, 1000, "red"));
    this.addChild(new Cat("Dino", "orange", new Vector2D(100, 100)));
  }

  render(ctx: CanvasRenderingContext2D) {
    super.render(ctx);
  }
}
