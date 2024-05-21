import Settings from "../settings";
import Scene from "./scene";
import Planet from "../bodies/planet";
import Vector from "../utils/vector";
import PhysicsManager from "../managers/physicsManager";
import Camera from "../camera";

import Background from "../gui/background";
import MainContainer from "../gui/mainContainer";

import initialConditions from "../initialConditions/tSolarSystem.json";

export default class Simulation extends Scene {
    pm!: PhysicsManager;
    camera: Camera;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);

        this.camera = new Camera(ctx, 0, 0, 1);
    }

    start(): void {
        this.pm = new PhysicsManager([]);

        this.setupCamera();

        this.setupBackground();

        this.setupPlanets();

        super.start();
    }

    update(_deltaTime: number): void {
        this.pm.solveSystem();

        super.update(_deltaTime);
    }

    draw(): void {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Apply camera transformations
        this.camera.applyTransformations();

        super.draw();

        // Reset transformations to avoid affecting other UI elements
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    cleanup(): void {
        super.cleanup();
    }

    setupCamera() {
        this.camera.start();
    }

    setupPlanets(): void {
        for (const planetParams of initialConditions) {
            const planet = new Planet(this.ctx, new Vector(planetParams.position[0], planetParams.position[1]), new Vector(planetParams.initialVelocity[0], planetParams.initialVelocity[1]));
            planet.setParams(planetParams.radius, planetParams.mass, planetParams.color);
            this.place(planet);
            this.pm.addPlanet(planet);
        }
    }

    setupBackground() {
        const background = new Background(this.ctx);
        this.place(background, Settings.BACKGROUND_LAYER);

        const mainContainer = new MainContainer(this.ctx);
        this.place(mainContainer, Settings.BACKGROUND_LAYER);
    }
}
