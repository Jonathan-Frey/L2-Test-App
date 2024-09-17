import { GameObject, Vector2D } from "jf-canvas-game-engine";
import Cat from "../gameObjects/Cat";
import { gameEngine } from "../main";

export class Level1 extends GameObject {
  constructor() {
    super();
    this.addChild(new Cat("Dino", "orange", new Vector2D(100, 100)));
  }

  render(delta: number, ctx: CanvasRenderingContext2D) {
    const screenSize = gameEngine.getScreenSize();
    ctx.fillStyle = "green";
    ctx.fillRect(
      this.position.x,
      this.position.y,
      screenSize.width,
      screenSize.height
    );
    super.render(delta, ctx);
  }
}
