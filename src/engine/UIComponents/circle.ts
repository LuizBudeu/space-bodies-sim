import GameObject from "../interfaces/GameObject";
import Vector from "../utils/vector";

class Circle implements GameObject {
    ctx: CanvasRenderingContext2D;
    position: Vector;
    circleRadius: number;
    circleColor: string;
    lineWidth: number;
    debugName: string;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.position = new Vector(100, 100);
        this.circleRadius = 50;
        this.circleColor = "#000"; // Default color is black
        this.lineWidth = 1; // Default line width is 1

        this.debugName = "Circle";
    }

    start(): void {}

    update(): void {}

    getPosition(): Vector {
        return this.position.clone();
    }

    setPosition(x?: number, y?: number): this {
        if (x !== undefined) {
            this.position.x = x;
        }
        if (y !== undefined) {
            this.position.y = y;
        }
        return this;
    }

    getRadius(): number {
        return this.circleRadius;
    }

    setRadius(radius: number): this {
        this.circleRadius = radius;
        return this;
    }

    getColor(): string {
        return this.circleColor;
    }

    setColor(color: string): this {
        this.circleColor = color;
        return this;
    }

    draw(): void {
        // Draw the circle
        this.ctx.fillStyle = this.circleColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.position.x, this.position.y, this.circleRadius, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }
}

export default Circle;
