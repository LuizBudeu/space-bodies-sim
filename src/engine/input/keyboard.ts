class Keyboard {
    static Keys = {
        ArrowLeft: "ArrowLeft",
        ArrowUp: "ArrowUp",
        ArrowRight: "ArrowRight",
        ArrowDown: "ArrowDown",
        Space: " ",
        Enter: "Enter",
        Shift: "Shift",
        Control: "Control",
        Alt: "Alt",
        W: "w",
        A: "a",
        S: "s",
        D: "d",
    } as const;

    static keyStates: { [key: string]: boolean } = {};

    static initialize(): void {
        window.addEventListener("keydown", Keyboard.handleKeyDown);
        window.addEventListener("keyup", Keyboard.handleKeyUp);
    }

    static handleKeyDown(event: KeyboardEvent): void {
        Keyboard.keyStates[event.key] = true;
    }

    static handleKeyUp(event: KeyboardEvent): void {
        Keyboard.keyStates[event.key] = false;
    }

    static isKeyDown(key: string): boolean {
        return Keyboard.keyStates[key] || false;
    }
}

export default Keyboard;
