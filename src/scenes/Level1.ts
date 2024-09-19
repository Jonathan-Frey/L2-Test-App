import {
  BorderOptions,
  GameObject,
  Rectangle,
  Panel,
  Vector2D,
} from "jf-canvas-game-engine";
import Cat from "../gameObjects/Cat";

export class Level1 extends GameObject {
  constructor() {
    super();
    this.addChild(new Rectangle(1000, 1000, "red"));
    const cat1 = new Cat("Dino", "orange", false, new Vector2D(100, 100));
    this.addChild(cat1);
    const ui1 = new Panel(
      50,
      50,
      "yellow",
      new BorderOptions("black", 2, 5),
      true,
      new Vector2D(10, 10)
    );
    this.addChild(ui1);
    const ui2 = new Panel(
      100,
      50,
      "blue",
      new BorderOptions("black", 2, 5),
      false,
      new Vector2D(0, -70)
    );
    cat1.addChild(ui2);
  }
}
