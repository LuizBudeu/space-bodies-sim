import Settings from "./settings";
import Scene from "./scenes/scene";
import Mouse from "./input/mouse";
import Keyboard from "./input/keyboard";

export default class Core {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    currentScene: Scene | null;
    previousTime: number;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        Mouse.initialize(canvas);
        Keyboard.initialize();

        this.setupCanvas();

        this.currentScene = null;
        this.previousTime = Date.now();
    }

    start() {
        if (!this.currentScene) {
            throw new Error("No scene to start. Please set a scene first.");
        }

        this.gameLoop();
    }

    update(deltaTime: number) {
        if (!this.currentScene) {
            throw new Error("No scene to update");
        }

        this.currentScene.update(deltaTime);
        this.currentScene.draw();
    }

    gameLoop() {
        const updateBound = this.update.bind(this);

        const loop = () => {
            const currentTime = Date.now();
            const deltaTime = (currentTime - this.previousTime) / 1000;
            Settings.DELTA_TIME = deltaTime;

            updateBound(deltaTime);

            this.previousTime = currentTime;

            requestAnimationFrame(loop);
        };

        loop();
    }

    setScene(newScene: Scene) {
        if (this.currentScene) {
            this.currentScene.cleanup();
        }
        this.currentScene = newScene;
        this.currentScene.start();
    }

    static reload() {
        window.location.reload();
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        Settings.CANVAS_WIDTH = this.canvas.width;
        Settings.CANVAS_HEIGHT = this.canvas.height;
    }

    getCanvasCenter() {
        return {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
        };
    }
}
