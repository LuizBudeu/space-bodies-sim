import GameObject from "../interfaces/GameObject";
import Vector from "../utils/vector";
import Settings from "../settings";
import Circle from "../UIComponents/circle";

interface PlanetParams {
    radius: number;
    mass: number;
    color: string;
}

export default class Planet implements GameObject {
    position: Vector = new Vector(0, 0);
    velocity: Vector = new Vector(0, 0);

    ctx: CanvasRenderingContext2D;
    circle: Circle;
    debugName: string = "Planet";

    params: PlanetParams = {
        radius: Settings.PLANET_DEFAULT_RADIUS,
        mass: Settings.PLANET_DEFAULT_MASS,
        color: Settings.PLANET_DEFAULT_COLOR,
    };

    constructor(ctx: CanvasRenderingContext2D, position: Vector = new Vector(0, 0), initialVelocity: Vector = new Vector(0, 0)) {
        this.ctx = ctx;
        this.position = position;
        this.velocity = initialVelocity;

        this.circle = new Circle(ctx);
    }

    start(): void {
        this.circle.setPosition(this.position.x, this.position.y).setRadius(this.params.radius).setColor(this.params.color);
    }

    setParams(radius: number | null = null, mass: number | null = null, color: string | null = null): void {
        if (radius !== null) this.params.radius = radius;
        if (mass !== null) this.params.mass = mass;
        if (color !== null) this.params.color = color;
    }

    applyForce(force: Vector): void {
        const acceleration = force.div(this.params.mass);
        this.velocity = this.velocity.add(acceleration);
        this.position = this.position.add(this.velocity);
    }

    update(_deltaTime: number): void {
        this.circle.setPosition(this.position.x, this.position.y);
    }

    draw(): void {
        this.circle.draw();
    }
}
