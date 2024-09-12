import Cat from "./GameObjects/Cat";
import "./style.css";
import GameEngine from "jf-canvas-game-engine";

const canvas = document.querySelector<HTMLCanvasElement>(
  "canvas"
) as HTMLCanvasElement;

const gameEngine = new GameEngine(canvas);
const cat = new Cat("Dino", "orange");
gameEngine.addGameObject(cat);
gameEngine.start();
