import Mouse from "./input/mouse";
import Keyboard, { Key } from "./input/keyboard";
import { WheelEventDetails } from "./interfaces/MouseEvents";

export default class Camera {
    private ctx: CanvasRenderingContext2D;
    private _x: number;
    private _y: number;
    private _zoom: number;

    constructor(ctx: CanvasRenderingContext2D, x: number = 0, y: number = 0, zoom: number = 1) {
        this.ctx = ctx;
        this._x = x;
        this._y = y;
        this._zoom = zoom;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get zoom(): number {
        return this._zoom;
    }

    set zoom(value: number) {
        this._zoom = value;
    }

    start(): void {
        Keyboard.addKeyDownEvent(this.handlePanning.bind(this), Key.ArrowUp, Key.ArrowDown, Key.ArrowLeft, Key.ArrowRight);

        Mouse.addWheelEvent(this.handleZoom.bind(this));
    }

    handleZoom(wheelEventDetails: WheelEventDetails): void {
        const zoomFactor = 1.1;
        if (wheelEventDetails.deltaY < 0) {
            this.setZoom(this.zoom * zoomFactor);
        } else {
            this.setZoom(this.zoom / zoomFactor);
        }
    }

    handlePanning(key: Key): void {
        const panSpeed = 10;
        switch (key) {
            case Key.ArrowUp:
                this.pan(0, panSpeed);
                break;
            case Key.ArrowDown:
                this.pan(0, -panSpeed);
                break;
            case Key.ArrowLeft:
                this.pan(panSpeed, 0);
                break;
            case Key.ArrowRight:
                this.pan(-panSpeed, 0);
                break;
        }
    }

    update(): void {}

    pan(dx: number, dy: number): void {
        this._x += dx;
        this._y += dy;
    }

    setZoom(zoom: number): void {
        this._zoom = zoom;
    }

    applyTransformations(): void {
        this.ctx.setTransform(this._zoom, 0, 0, this._zoom, -this._x, -this._y);
    }
}
