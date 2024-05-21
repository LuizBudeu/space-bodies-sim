export enum Key {
    ArrowLeft = "ArrowLeft",
    ArrowUp = "ArrowUp",
    ArrowRight = "ArrowRight",
    ArrowDown = "ArrowDown",
    Space = " ",
    Enter = "Enter",
    Shift = "Shift",
    Control = "Control",
    Alt = "Alt",
    W = "w",
    A = "a",
    S = "s",
    D = "d",
}

export default class Keyboard {
    static keyStates: { [key in Key]?: boolean } = {};
    static keyDownEvents: { [key in Key]?: (key: Key) => void } = {};
    static keyUpEvents: { [key in Key]?: (key: Key) => void } = {};

    static initialize(): void {
        window.addEventListener("keydown", Keyboard.handleKeyDown);
        window.addEventListener("keyup", Keyboard.handleKeyUp);
    }

    static addKeyDownEvent(callback: (key: Key) => void, ...keys: Key[]): void {
        keys.forEach((key) => {
            Keyboard.keyDownEvents[key] = callback;
        });
    }

    static removeKeyDownEvent(...keys: Key[]): void {
        keys.forEach((key) => {
            delete Keyboard.keyDownEvents[key];
        });
    }

    static handleKeyDown(event: KeyboardEvent): void {
        const key = event.key as Key;
        Keyboard.keyStates[key] = true;

        const callback = Keyboard.keyDownEvents[key];
        if (callback) {
            callback(key);
        }
    }

    static addKeyUpEvent(callback: (key: Key) => void, ...keys: Key[]): void {
        keys.forEach((key) => {
            Keyboard.keyUpEvents[key] = callback;
        });
    }

    static removeKeyUpEvent(...keys: Key[]): void {
        keys.forEach((key) => {
            delete Keyboard.keyUpEvents[key];
        });
    }

    static handleKeyUp(event: KeyboardEvent): void {
        const key = event.key as Key;
        Keyboard.keyStates[key] = false;

        const callback = Keyboard.keyUpEvents[key];
        if (callback) {
            callback(key);
        }
    }

    static isKeyDown(key: Key): boolean {
        return Keyboard.keyStates[key] || false;
    }
}
