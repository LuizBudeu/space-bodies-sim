import Vector from "../utils/vector";
import GameObject from "../interfaces/GameObject";
import { MouseEventCallback, MouseEventDetails, WheelEventCallback, WheelEventDetails } from "../interfaces/MouseEvents";

class Mouse {
    static canvas: HTMLCanvasElement | null = null;
    static position: Vector = new Vector();

    static leftButtonPressed: boolean = false;
    static rightButtonPressed: boolean = false;
    static leftClickDragStart: Vector = new Vector();
    static leftClickDragging: boolean = false;
    static rightClickDragStart: Vector = new Vector();
    static rightClickDragging: boolean = false;

    static cursorStyle: string = "default";

    static rightClickDownEvents: MouseEventCallback[] = [];
    static rightClickUpEvents: MouseEventCallback[] = [];
    static leftClickDownEvents: MouseEventCallback[] = [];
    static leftClickUpEvents: MouseEventCallback[] = [];
    static mouseMoveEvents: ((event: MouseEventDetails) => void)[] = [];
    static leftClickDraggingEvents: MouseEventCallback[] = [];
    static rightClickDraggingEvents: MouseEventCallback[] = [];
    static wheelEvents: WheelEventCallback[] = [];

    static initialize(canvas: HTMLCanvasElement): void {
        if (Mouse.canvas) {
            console.error("Mouse is already initialized.");
            return;
        }

        Mouse.canvas = canvas;

        // Event listeners for mouse movement and clicks
        Mouse.canvas.addEventListener("mousemove", Mouse.handleMouseMove);
        Mouse.canvas.addEventListener("mousedown", Mouse.handleMouseDown);
        Mouse.canvas.addEventListener("mouseup", Mouse.handleMouseUp);
        Mouse.canvas.addEventListener("wheel", Mouse.handleWheel);
    }

    static handleMouseDown(event: MouseEvent): void {
        Mouse.updatePosition(event);
        if (event.button === 0) {
            Mouse.leftButtonPressed = true;
            Mouse.handleLeftClickDown(event);

            if (!Mouse.leftClickDragging) {
                Mouse.leftClickDragStart = Mouse.position.clone();
                Mouse.leftClickDragging = true;
            }
        } else if (event.button === 2) {
            Mouse.rightButtonPressed = true;
            Mouse.handleRightClickDown(event);

            if (!Mouse.rightClickDragging) {
                Mouse.rightClickDragStart = Mouse.position.clone();
                Mouse.rightClickDragging = true;
            }
        }
    }

    static handleMouseUp(event: MouseEvent): void {
        Mouse.updatePosition(event);
        if (event.button === 0) {
            Mouse.leftButtonPressed = false;
            Mouse.handleLeftClickUp(event);
            Mouse.leftClickDragging = false;
        } else if (event.button === 2) {
            Mouse.rightButtonPressed = false;
            Mouse.handleRightClickUp(event);
            Mouse.rightClickDragging = false;
        }
    }

    static updatePosition(event: MouseEvent): void {
        if (!Mouse.canvas) return;
        const rect = Mouse.canvas.getBoundingClientRect();
        Mouse.position = new Vector(event.clientX - rect.left, event.clientY - rect.top);
    }

    static getPosition(): Vector {
        return Mouse.position.clone();
    }

    static addRightClickDownEvent(callback: (event: MouseEventDetails) => void, targetGameObject: GameObject | null = null): void {
        Mouse.rightClickDownEvents.push({ callback, targetGameObject });
    }

    static removeRightClickEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.rightClickDownEvents = Mouse.rightClickDownEvents.filter((cb) => cb.callback !== callback);
    }

    static addRightClickUpEvent(callback: (event: MouseEventDetails) => void, targetGameObject: GameObject | null = null): void {
        Mouse.rightClickUpEvents.push({ callback, targetGameObject });
    }

    static removeRightClickUpEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.rightClickUpEvents = Mouse.rightClickUpEvents.filter((cb) => cb.callback !== callback);
    }

    static addLeftClickUpEvent(callback: (event: MouseEventDetails) => void, targetGameObject: GameObject | null = null): void {
        Mouse.leftClickUpEvents.push({ callback, targetGameObject });
    }

    static removeLeftClickUpEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.leftClickUpEvents = Mouse.leftClickUpEvents.filter((cb) => cb.callback !== callback);
    }

    static addLeftClickDownEvent(callback: (event: MouseEventDetails) => void, targetGameObject: GameObject | null = null): void {
        Mouse.leftClickDownEvents.push({ callback, targetGameObject });
    }

    static removeLeftClickEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.leftClickDownEvents = Mouse.leftClickDownEvents.filter((cb) => cb.callback !== callback);
    }

    static addMouseMoveEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.mouseMoveEvents.push(callback);
    }

    static removeMouseMoveEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.mouseMoveEvents = Mouse.mouseMoveEvents.filter((cb) => cb !== callback);
    }

    static addLeftClickDraggingEvent(callback: (event: MouseEventDetails) => void, targetGameObject: GameObject | null = null): void {
        Mouse.leftClickDraggingEvents.push({ callback, targetGameObject });
    }

    static removeLeftDraggingEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.leftClickDraggingEvents = Mouse.leftClickDraggingEvents.filter((cb) => cb.callback !== callback);
    }

    static addRightClickDraggingEvent(callback: (event: MouseEventDetails) => void, targetGameObject: GameObject | null = null): void {
        Mouse.rightClickDraggingEvents.push({ callback, targetGameObject });
    }

    static removeRightDraggingEvent(callback: (event: MouseEventDetails) => void): void {
        Mouse.rightClickDraggingEvents = Mouse.rightClickDraggingEvents.filter((cb) => cb.callback !== callback);
    }

    static addWheelEvent(callback: (event: WheelEventDetails) => void, direction: "up" | "down" | null = null): void {
        Mouse.wheelEvents.push({ callback, direction });
    }

    static removeWheelEvent(callback: (event: WheelEventDetails) => void): void {
        Mouse.wheelEvents = Mouse.wheelEvents.filter((cb) => cb.callback !== callback);
    }

    static handleRightClickDown(_event: MouseEvent): void {
        const { x, y } = Mouse.getPosition();

        Mouse.rightClickDownEvents.forEach(({ callback, targetGameObject }) => {
            if (targetGameObject && !Mouse.isOver(targetGameObject)) return;

            callback({
                x,
                y,
                button: "right",
            });
        });
    }

    static handleRightClickUp(_event: MouseEvent): void {
        const { x, y } = Mouse.getPosition();

        Mouse.rightClickUpEvents.forEach(({ callback, targetGameObject }) => {
            if (targetGameObject && !Mouse.isOver(targetGameObject)) return;

            callback({
                x,
                y,
                button: "right",
            });
        });
    }

    static handleLeftClickDown(_event: MouseEvent): void {
        const { x, y } = Mouse.getPosition();

        Mouse.leftClickDownEvents.forEach(({ callback, targetGameObject }) => {
            if (targetGameObject && !Mouse.isOver(targetGameObject)) return;

            callback({
                x,
                y,
                button: "left",
            });
        });
    }

    static handleLeftClickUp(_event: MouseEvent): void {
        const { x, y } = Mouse.getPosition();

        Mouse.leftClickUpEvents.forEach(({ callback, targetGameObject }) => {
            if (targetGameObject && !Mouse.isOver(targetGameObject)) return;

            callback({
                x,
                y,
                button: "left",
            });
        });
    }

    static handleMouseMove(event: MouseEvent): void {
        Mouse.updatePosition(event);
        const { x, y } = Mouse.getPosition();

        if (Mouse.leftButtonPressed) Mouse.handleLeftClickDragging(event);
        if (Mouse.rightButtonPressed) Mouse.handleRightClickDragging(event);

        Mouse.mouseMoveEvents.forEach((callback) => {
            callback({
                x,
                y,
            });
        });
    }

    static handleLeftClickDragging(_event: MouseEvent): void {
        const { x, y } = Mouse.getPosition();

        Mouse.leftClickDraggingEvents.forEach(({ callback, targetGameObject }) => {
            if (targetGameObject && !Mouse.isOver(targetGameObject)) return;

            const deltaX = x - Mouse.leftClickDragStart.x;
            const deltaY = y - Mouse.leftClickDragStart.y;

            callback({
                x,
                y,
                dragStartX: Mouse.leftClickDragStart.x,
                dragStartY: Mouse.leftClickDragStart.y,
                deltaX,
                deltaY,
            });

            Mouse.leftClickDragStart = Mouse.position.clone();
        });
    }

    static handleRightClickDragging(_event: MouseEvent): void {
        const { x, y } = Mouse.getPosition();

        Mouse.rightClickDraggingEvents.forEach(({ callback, targetGameObject }) => {
            if (targetGameObject && !Mouse.isOver(targetGameObject)) return;

            const deltaX = x - Mouse.rightClickDragStart.x;
            const deltaY = y - Mouse.rightClickDragStart.y;

            callback({
                x,
                y,
                dragStartX: Mouse.rightClickDragStart.x,
                dragStartY: Mouse.rightClickDragStart.y,
                deltaX,
                deltaY,
            });

            Mouse.rightClickDragStart = Mouse.position.clone();
        });
    }

    static handleWheel(event: WheelEvent): void {
        const { x, y } = Mouse.getPosition();

        Mouse.wheelEvents.forEach(({ callback, direction }) => {
            if (direction === "up" && event.deltaY < 0) {
                callback({ x, y, deltaY: event.deltaY });
            } else if (direction === "down" && event.deltaY > 0) {
                callback({ x, y, deltaY: event.deltaY });
            } else if (!direction) {
                callback({ x, y, deltaY: event.deltaY });
            }
        });
    }

    static isLeftButtonDown(): boolean {
        return Mouse.leftButtonPressed;
    }

    static isRightButtonDown(): boolean {
        return Mouse.rightButtonPressed;
    }

    static isOver(gameObject: GameObject): boolean {
        const { x, y } = Mouse.position;
        const width = (gameObject as { width?: number }).width || 10;
        const height = (gameObject as { height?: number }).height || 10;
        return x >= gameObject.position.x && x <= gameObject.position.x + width && y >= gameObject.position.y && y <= gameObject.position.y + height;
    }

    static setCursorStyle(style: string): void {
        Mouse.cursorStyle = style;
        if (Mouse.canvas) {
            Mouse.canvas.style.cursor = style;
        }
    }
}

export default Mouse;
