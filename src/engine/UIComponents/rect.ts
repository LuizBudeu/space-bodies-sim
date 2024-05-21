import Text from "./text";
import Vector from "../utils/vector";
import GameObject from "../interfaces/GameObject";

class Rect implements GameObject {
    private ctx: CanvasRenderingContext2D;
    position: Vector;
    private width: number;
    private height: number;
    private color: string;
    private lineWidth: number;
    private lineColor: string;
    private text: Text;
    debugName: string;
    debugging: boolean;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.position = new Vector(100, 100);
        this.width = 100;
        this.height = 100;
        this.color = "#000"; // Default color is black
        this.lineWidth = 1; // Default line width is 1
        this.lineColor = "#000"; // Default line color is black
        this.debugging = false;
        this.debugName = "Rect";
        this.text = new Text(ctx);
    }

    start(): void {
        this.text.start();
        this.text.centerInRect(this);
    }

    update(): void {
        this.text.update();
    }

    getPosition(): Vector {
        return this.position.clone();
    }

    setPosition(x: number | null = null, y: number | null = null): this {
        if (x !== null) this.position.x = x;
        if (y !== null) this.position.y = y;
        return this;
    }

    getCenter(): Vector {
        return new Vector(this.position.x + this.width / 2, this.position.y + this.height / 2);
    }

    setCenter(x: number | null = null, y: number | null = null): this {
        if (x !== null) this.position.x = x - this.width / 2;
        if (y !== null) this.position.y = y - this.height / 2;
        return this;
    }

    centerText(): void {
        const textWidth = this.ctx.measureText(this.text.getContent()).width;
        const textHeight = this.text.getStyle().fontSize;
        this.text.setPosition(this.position.x + this.width / 2 - textWidth / 2, this.position.y + this.height / 2 + textHeight / 2);
    }

    getSize(): { width: number; height: number } {
        return { width: this.width, height: this.height };
    }

    setSize(width: number | null = null, height: number | null = null, lineWidth: number | null = null): this {
        if (width !== null) this.width = width;
        if (height !== null) this.height = height;
        if (lineWidth !== null) this.lineWidth = lineWidth;
        return this;
    }

    getColor(): { color: string; lineColor: string } {
        return {
            color: this.color,
            lineColor: this.lineColor,
        };
    }

    setColor(color: string | null = null, lineColor: string | null = null): this {
        if (color !== null) this.color = color;
        if (lineColor !== null) this.lineColor = lineColor;
        return this;
    }

    draw(): this {
        // Draw the rectangle
        this.ctx.fillStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.strokeRect(this.position.x, this.position.y, this.width, this.height);

        // Draw the inner text
        this.text.draw();

        return this;
    }
}

export default Rect;
