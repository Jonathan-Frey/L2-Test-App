import {
  GameContext,
  CollisionBody,
  RectangleCollisionShape,
  Vector2D,
  Camera,
} from "jf-canvas-game-engine";
import CatNecklace from "./CatNecklace";
import { Bullet } from "./Bullet";
import { Level2 } from "../scenes/Level2";

export default class Cat extends CollisionBody {
  #name: string;
  #color: string | CanvasPattern | CanvasGradient;
  #width: number = 50;
  #height: number = 50;
  #camera: Camera;
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
  }

  process(delta: number) {
    if (GameContext.getInstance().isJustPressed("Enter")) {
      GameContext.getInstance().navigateToScene(new Level2());
    }
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
    this.#handleMovement(delta);
  }

  #handleMovement(delta: number) {
    const gameContext = GameContext.getInstance();
    const speed = 1000;
    if (gameContext.isPressed("w")) {
      this.#velocity = this.#velocity.add(new Vector2D(0, -speed));
    }
    if (gameContext.isPressed("s")) {
      this.#velocity = this.#velocity.add(new Vector2D(0, speed));
    }
    if (gameContext.isPressed("a")) {
      this.#velocity = this.#velocity.add(new Vector2D(-speed, 0));
    }
    if (gameContext.isPressed("d")) {
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
