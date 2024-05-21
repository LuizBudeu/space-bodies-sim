class Vector {
    private _x: number;
    private _y: number;

    constructor(x: number = 0, y: number = 0) {
        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    set x(x: number) {
        this._x = x;
    }

    set y(y: number) {
        this._y = y;
    }

    add(vector: Vector): Vector {
        return new Vector(this._x + vector._x, this._y + vector._y);
    }

    sub(vector: Vector): Vector {
        return new Vector(this._x - vector._x, this._y - vector._y);
    }

    mul(scalar: number): Vector {
        return new Vector(this._x * scalar, this._y * scalar);
    }

    div(scalar: number): Vector {
        if (scalar !== 0) {
            return new Vector(this._x / scalar, this._y / scalar);
        }
        throw new Error("Division by zero is not allowed.");
    }

    magnitude(): number {
        return Math.sqrt(this._x ** 2 + this._y ** 2);
    }

    normalize(): Vector {
        const mag = this.magnitude();
        if (mag !== 0) {
            return this.div(mag);
        }
        throw new Error("Cannot normalize a zero vector.");
    }

    dot(vector: Vector): number {
        return this._x * vector._x + this._y * vector._y;
    }

    static add(vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1._x + vector2._x, vector1._y + vector2._y);
    }

    static sub(vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1._x - vector2._x, vector1._y - vector2._y);
    }

    static mul(vector: Vector, scalar: number): Vector {
        return new Vector(vector._x * scalar, vector._y * scalar);
    }

    static div(vector: Vector, scalar: number): Vector {
        if (scalar !== 0) {
            return new Vector(vector._x / scalar, vector._y / scalar);
        } else {
            throw new Error("Division by zero is not allowed.");
        }
    }

    static distance(vector1: Vector, vector2: Vector): number {
        const dx = vector2._x - vector1._x;
        const dy = vector2._y - vector1._y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    clone(): Vector {
        return new Vector(this._x, this._y);
    }

    distanceTo(vector: Vector): number {
        return Vector.distance(this, vector);
    }
}

export default Vector;
