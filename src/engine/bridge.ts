import Scene from "./scenes/scene";
import GameObject from "./interfaces/GameObject";
import Settings from "./settings";

class Bridge {
    static currentScene: Scene | null = null;

    static setcurrentScene(currentScene: Scene) {
        Bridge.currentScene = currentScene;
    }

    static placeInCurrentScene(object: GameObject, layer: number = Settings.FOREGROUND_LAYER) {
        if (!Bridge.currentScene) {
            throw new Error("Scene instance not set. Please set it before using Bridge.addObjectToScene.");
        }
        Bridge.currentScene.place(object, layer);
    }

    static removeFromCurrentScene(object: GameObject, layer: number = Settings.FOREGROUND_LAYER) {
        if (!Bridge.currentScene) {
            throw new Error("Scene instance not set. Please set it before using Bridge.removeObjectFromScene.");
        }
        Bridge.currentScene.remove(object, layer);
    }
}

export default Bridge;
