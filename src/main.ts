import { Level1 } from "./scenes/Level1";
import "./style.css";
import { GameEngine } from "jf-canvas-game-engine";

const canvas = document.querySelector<HTMLCanvasElement>(
  "canvas"
) as HTMLCanvasElement;
canvas.addEventListener("dblclick", () => {
  canvas.requestFullscreen();
});

const level1 = new Level1();

export const gameEngine = new GameEngine(canvas, level1, { debug: true });

gameEngine.start();
