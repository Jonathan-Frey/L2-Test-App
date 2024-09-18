import {
  FixedGameObject,
  GameObject,
  Rectangle,
  Vector2D,
} from "jf-canvas-game-engine";
import Cat from "../gameObjects/Cat";

export class Level1 extends GameObject {
  constructor() {
    super();
    this.addChild(new Rectangle(1000, 1000, "red"));
    this.addChild(new Cat("Dino", "orange", new Vector2D(100, 100)));
    this.addChild(new FixedGameObject(new Vector2D(0, 0)));
  }

  render(ctx: CanvasRenderingContext2D) {
    super.render(ctx);
  }
}
