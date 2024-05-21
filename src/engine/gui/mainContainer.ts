import Rect from "../UIComponents/rect";
import GameObject from "../interfaces/GameObject";
import Settings from "../settings";
import Vector from "../utils/vector";

export default class MainContainer implements GameObject {
    rect: Rect;
    private ctx: CanvasRenderingContext2D;
    position: Vector;
    debugName: string;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.rect = new Rect(this.ctx);
        this.position = new Vector(Settings.MAIN_CONTAINER_MARGIN, Settings.MAIN_CONTAINER_MARGIN);
        this.debugName = "MainContainer";
    }

    start(): void {
        const { x, y } = this.position;

        const mainContainerHeight = this.ctx.canvas.height - 2 * Settings.MAIN_CONTAINER_MARGIN;
        this.rect
            .setPosition(x, y)
            .setSize(this.ctx.canvas.width - Settings.MAIN_CONTAINER_MARGIN * 2, mainContainerHeight)
            .setColor(Settings.MAIN_CONTAINER_COLOR);

        this.rect.start();
    }

    update(): void {
        this.rect.update();
    }

    draw(): void {
        this.rect.draw();
    }
}
