import Cat from "./GameObjects/Cat";
import "./style.css";
import GameEngine from "jf-canvas-game-engine";

const canvas = document.querySelector<HTMLCanvasElement>(
  "canvas"
) as HTMLCanvasElement;
canvas.addEventListener("dblclick", () => {
  canvas.requestFullscreen();
});

const gameEngine = new GameEngine(canvas, { debug: true });
const cat = new Cat(50, 50, "Dino", "orange");
const cat2 = new Cat(100, 100, "Siv", "gray");
cat.addChild(cat2);
gameEngine.addGameObject(cat);

gameEngine.start();
