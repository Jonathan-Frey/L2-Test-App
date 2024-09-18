import {
  BorderOptions,
  FixedGameObject,
  GameObject,
  Rectangle,
  UiCard,
  Vector2D,
} from "jf-canvas-game-engine";
import Cat from "../gameObjects/Cat";

export class Level1 extends GameObject {
  constructor() {
    super();
    this.addChild(new Rectangle(1000, 1000, "red"));
    this.addChild(new Cat("Dino", "orange", new Vector2D(100, 100)));
    const ui1 = new UiCard(
      50,
      50,
      "yellow",
      new BorderOptions("black", 2, 5),
      new Vector2D(10, 10)
    );
    this.addChild(ui1);
    const ui2 = new UiCard(
      50,
      50,
      "green",
      new BorderOptions("black", 2, 5),
      new Vector2D(70, 10)
    );
    ui1.addChild(ui2);
  }
}
