import Cat from "./GameObjects/Cat";
import "./style.css";
import GameEngine from "jf-canvas-game-engine";

const canvas = document.querySelector<HTMLCanvasElement>(
  "canvas"
) as HTMLCanvasElement;
canvas.addEventListener("dblclick", () => {
  canvas.requestFullscreen();
});

const gameEngine = new GameEngine(canvas);
const cat = new Cat(50, 50, "Dino", "orange");
cat.addEventListener("click", () => {
  console.log("meow");
});
gameEngine.addGameObject(cat);
gameEngine.start();
