import "./style.css";
import GameEngine from "jf-canvas-game-engine";

const canvas = document.querySelector<HTMLCanvasElement>(
  "canvas"
) as HTMLCanvasElement;

const gameEngine = new GameEngine(canvas);

gameEngine.start();
