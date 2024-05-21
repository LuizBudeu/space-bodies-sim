import GameObject from "../interfaces/GameObject";
import TwoWayMap from "../utils/twoWayMap";
import Settings from "../settings";

export default class Scene {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    layerGameObjects: Record<number, GameObject[]>;
    gameObjectId: number;
    gameObjectsMap: TwoWayMap;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.layerGameObjects = {
            0: [], // Background
            1: [],
            2: [],
            3: [],
            4: [],
            5: [], // Foreground
            6: [],
            7: [],
            8: [], // UI
            9: [],
            10: [],
        };

        this.gameObjectId = 0;
        this.gameObjectsMap = new TwoWayMap();
    }

    start(): void {
        for (let i = 0; i <= 10; i++) {
            this.layerGameObjects[i].forEach((gameObject) => {
                gameObject.start();
            });
        }
    }

    update(deltaTime: number): void {
        for (let i = 0; i <= 10; i++) {
            this.layerGameObjects[i].forEach((gameObject) => {
                gameObject.update(deltaTime);
            });
        }
    }

    draw(): void {
        for (let i = 0; i <= 10; i++) {
            this.layerGameObjects[i].forEach((gameObject) => {
                // Game objects can mess with the context, so we need to reset it every time
                this.ctx.strokeStyle = "#000";
                this.ctx.font = "20px Arial";
                gameObject.draw();
            });
        }
        // this.debug();
    }

    cleanup(): void {
        this.gameObjectsMap.clear();
    }

    place(gameObject: GameObject, layer: number = Settings.FOREGROUND_LAYER, start: boolean = false) {
        this.layerGameObjects[layer].push(gameObject);
        this.addToGameObjectMap(gameObject);
        if (start) gameObject.start();
    }

    remove(gameObject: GameObject, layer: number = Settings.FOREGROUND_LAYER) {
        this.layerGameObjects[layer] = this.layerGameObjects[layer].filter((obj: GameObject) => obj !== gameObject);
        this.removeFromGameObjectMap(gameObject);
    }

    addToGameObjectMap(gameObject: GameObject) {
        this.gameObjectsMap.set(this.gameObjectId, gameObject);
        this.gameObjectId++;
    }

    removeFromGameObjectMap(gameObject: GameObject) {
        this.gameObjectsMap.revDelete(gameObject);
    }

    getGameObjectById(id: number) {
        return this.gameObjectsMap.get(id);
    }

    getIdByGameObject(gameObject: GameObject) {
        return this.gameObjectsMap.revGet(gameObject);
    }

    setSceneMode(mode: number) {
        Settings.SCENE_MODE = mode;
    }
}
