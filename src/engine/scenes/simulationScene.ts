import Settings from "../settings";
import Scene from "./scene";
import Planet from "../bodies/planet";
import Vector from "../utils/vector";
import PhysicsManager from "../managers/physicsManager";

export default class Simulation extends Scene {
    pm!: PhysicsManager;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);
    }

    start(): void {
        this.pm = new PhysicsManager([]);

        const planet1 = new Planet(this.ctx, new Vector(100, 200), new Vector(0, 0.5));
        planet1.setParams(50, 1000, "blue");
        this.place(planet1);
        this.pm.addPlanet(planet1);

        const planet2 = new Planet(this.ctx, new Vector(1000, 400), new Vector(0, -0.5));
        planet2.setParams(50, 1000, "red");
        this.place(planet2);
        this.pm.addPlanet(planet2);

        const planet3 = new Planet(this.ctx, new Vector(1500, 700), new Vector(-1.5, 0));
        planet3.setParams(50, 1000, "green");
        this.place(planet3);
        this.pm.addPlanet(planet3);

        const planet4 = new Planet(this.ctx, new Vector(1800, 100), new Vector(0, 1));
        planet4.setParams(50, 1000, "yellow");
        this.place(planet4);
        this.pm.addPlanet(planet4);

        this.setupBackground();

        super.start();
    }

    update(_deltaTime: number): void {
        this.pm.solveSystem();

        super.update(_deltaTime);
    }

    draw(): void {
        this.ctx.fillStyle = Settings.CANVAS_BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        super.draw();
    }

    cleanup(): void {
        super.cleanup();
    }

    setupBackground() {
        this.ctx.fillStyle = Settings.CANVAS_BACKGROUND_COLOR;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
