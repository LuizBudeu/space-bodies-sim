import Rect from "../UIComponents/rect";
import GameObject from "../interfaces/GameObject";
import Settings from "../settings";
import Vector from "../utils/vector";

export default class Background implements GameObject {
    rect: Rect;
    private ctx: CanvasRenderingContext2D;
    position: Vector;
    debugName: string;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.rect = new Rect(this.ctx);
        this.position = new Vector(0, 0);
        this.debugName = "Background";
    }

    start(): void {
        const { x, y } = this.position;
        this.rect.setPosition(x, y).setSize(this.ctx.canvas.width, this.ctx.canvas.height).setColor(Settings.CANVAS_BACKGROUND_COLOR);
        this.rect.start();
    }

    update(): void {
        this.rect.update();
    }

    draw(): void {
        this.rect.draw();
    }
}
