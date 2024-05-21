import Settings from "../settings";
import Scene from "./scene";
import Planet from "../bodies/planet";
import Vector from "../utils/vector";
import PhysicsManager from "../managers/physicsManager";

import Background from "../gui/background";
import MainContainer from "../gui/mainContainer";

import initialParams from "../initialParams.json";

export default class Simulation extends Scene {
    pm!: PhysicsManager;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        super(canvas, ctx);
    }

    start(): void {
        this.pm = new PhysicsManager([]);

        this.setupBackground();

        this.setupPlanets();

        super.start();
    }

    update(_deltaTime: number): void {
        this.pm.solveSystem();

        super.update(_deltaTime);
    }

    draw(): void {
        super.draw();
    }

    cleanup(): void {
        super.cleanup();
    }

    setupPlanets(): void {
        for (const planetParams of initialParams) {
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
