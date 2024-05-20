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

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    add(vector: Vector): this {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    sub(vector: Vector): this {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    mul(scalar: number): this {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    div(scalar: number): this {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    normalize(): this {
        const mag = this.magnitude();
        if (mag !== 0) {
            this.div(mag);
        }
        return this;
    }

    static add(vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    }

    static sub(vector1: Vector, vector2: Vector): Vector {
        return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    }

    static mul(vector: Vector, scalar: number): Vector {
        return new Vector(vector.x * scalar, vector.y * scalar);
    }

    static div(vector: Vector, scalar: number): Vector {
        if (scalar !== 0) {
            return new Vector(vector.x / scalar, vector.y / scalar);
        } else {
            return new Vector();
        }
    }

    static distance(vector1: Vector, vector2: Vector): number {
        const dx = vector2.x - vector1.x;
        const dy = vector2.y - vector1.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    distanceTo(vector: Vector): number {
        return Vector.distance(this, vector);
    }
}

export default Vector;
