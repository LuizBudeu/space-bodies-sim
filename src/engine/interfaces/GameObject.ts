import Vector from "../utils/vector";

export default interface GameObject {
    position: Vector;
    debugName: string;
    start(): void;
    update(deltaTime: number): void;
    draw(): void;
}
