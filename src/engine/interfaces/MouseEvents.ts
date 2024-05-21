import GameObject from "./GameObject";

export interface MouseEventCallback {
    callback: (event: MouseEventDetails) => void;
    targetGameObject?: GameObject | null;
}

export interface MouseEventDetails {
    x: number;
    y: number;
    button?: string;
    dragStartX?: number;
    dragStartY?: number;
    deltaX?: number;
    deltaY?: number;
}

export interface WheelEventCallback {
    callback: (event: WheelEventDetails) => void;
    direction: "up" | "down" | null;
}

export interface WheelEventDetails {
    x: number;
    y: number;
    deltaY: number;
}
