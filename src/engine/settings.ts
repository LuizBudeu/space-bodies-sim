import Vector from "./utils/vector";

const Settings = {
    CANVAS_WIDTH: 800, // This is the default value, it will be changed in core
    CANVAS_HEIGHT: 600, // This is the default value, it will be changed in core
    DELTA_TIME: 0.167, // This is the default value, it will be changed in core

    BACKGROUND_LAYER: 0,
    FOREGROUND_LAYER: 5,
    UI_LAYER: 8,

    CANVAS_BACKGROUND_COLOR: "#07010E",
    MAIN_CONTAINER_COLOR: "#020612",
    MAIN_CONTAINER_MARGIN: 10,
    CONTROL_PANEL_COLOR: "#0C0C0C",
    CONTROL_PANEL_HEIGHT: 60,

    SCENE_MODE: 0,
    SCENE_MODE_OPTIONS: {
        DEFAULT: 0,
        DELETE: 1,
    },

    PLANET_DEFAULT_POSITION: new Vector(100, 100),
    PLANET_DEFAULT_RADIUS: 50,
    PLANET_DEFAULT_MASS: 1000,
    PLANET_DEFAULT_COLOR: "red",

    GRAVITATIONAL_CONSTANT: 1,
    DISTANCE_EXAGERATION_FACTOR: 1000,
    COEFFICIENT_OF_RESTITUTION: 0.25,
};

export default Settings;
