import {
  BorderOptions,
  GameObject,
  Panel,
  Vector2D,
} from "jf-canvas-game-engine";
import Cat from "../gameObjects/Cat";
import Floor from "../gameObjects/Floor";
import Box from "../gameObjects/Box";
import PushableBox from "../gameObjects/PushableBox";

export class Level1 extends GameObject {
  constructor() {
    super(new Vector2D(0, 0));

    // Add a floor to the scene
    this.addChild(new Floor(new Vector2D(0, 0), 1000, 1000, "brown"));

    // Add a cat to the scene
    const cat1 = new Cat(new Vector2D(100, 100), "Dino", "orange");
    this.addChild(cat1);

    // Add a UI panel to the scene
    const ui1 = new Panel(
      new Vector2D(10, 10),
      true,
      50,
      50,
      "yellow",
      new BorderOptions("black", 2, 5)
    );
    this.addChild(ui1);

    // Add a box to the scene
    const box = new Box(new Vector2D(200, 200), 50, 50, "green");
    this.addChild(box);

    const pushableBox = new PushableBox(
      new Vector2D(300, 300),
      50,
      50,
      "purple"
    );
    this.addChild(pushableBox);
  }
}
