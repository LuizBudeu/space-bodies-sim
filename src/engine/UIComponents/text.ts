import type Rect from "./rect";
import Vector from "../utils/vector";
import GameObject from "../interfaces/GameObject";

class Text implements GameObject {
    private ctx: CanvasRenderingContext2D;
    private content: string;
    position: Vector;
    debugName: string;
    private _fontColor: string;
    private _fontSize: number;
    private _fontFamily: string;
    private _font: string;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;

        this.content = "";
        this.position = new Vector(100, 100);
        this.debugName = "Text";

        this._fontColor = "#000";
        this._fontSize = 20;
        this._fontFamily = "Arial";
        this._font = `${this._fontSize}px ${this._fontFamily}`;
    }

    start(): void {}

    update(): void {}

    getPosition(): Vector {
        return this.position.clone();
    }

    setPosition(x: number | null = null, y: number | null = null): this {
        if (x !== null) this.position.x = x;
        if (y !== null) this.position.y = y;
        return this;
    }

    setCenter(x: number | null = null, y: number | null = null): this {
        if (x !== null) this.position.x = x - this.ctx.measureText(this.content).width / 2;
        if (y !== null) this.position.y = y + this._fontSize / 3;
        return this;
    }

    centerInRect(rect: Rect): void {
        const centerX = rect.getPosition().x + rect.getSize().width / 2;
        const centerY = rect.getPosition().y + rect.getSize().height / 2;

        this.ctx.font = this._font;
        const textWidth = this.ctx.measureText(this.content).width;
        const textHeight = this._fontSize;

        const textX = centerX - textWidth / 2;
        const textY = centerY + textHeight / 3;

        this.setPosition(textX, textY);
    }

    getContent(): string {
        return this.content;
    }

    setContent(content: string): this {
        this.content = content;
        return this;
    }

    setStyle(fontFamily: string | null = null, fontSize: number | null = null, fontColor: string | null = null): void {
        if (fontFamily !== null) this._fontFamily = fontFamily;
        if (fontSize !== null) this._fontSize = fontSize;
        if (fontColor !== null) this._fontColor = fontColor;
        this._font = `${this._fontSize}px ${this._fontFamily}`;
    }

    getStyle(): { fontFamily: string; fontSize: number; fontColor: string } {
        return {
            fontFamily: this._fontFamily,
            fontSize: this._fontSize,
            fontColor: this._fontColor,
        };
    }

    draw(): void {
        this.ctx.font = this._font;
        this.ctx.fillStyle = this._fontColor;
        this.ctx.fillText(this.content, this.position.x, this.position.y);
    }
}

export default Text;
