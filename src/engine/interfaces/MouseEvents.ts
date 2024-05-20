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
