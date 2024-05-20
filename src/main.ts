import Core from "./engine/core";
import SimulationScene from "./engine/scenes/simulationScene";

const canvas = document.getElementById("space-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const core = new Core(canvas, ctx);
core.setScene(new SimulationScene(canvas, ctx));
core.start();
