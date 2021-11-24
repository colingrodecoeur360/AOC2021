export interface Vector {
    x: number;
    y: number;
}

export interface Move {
    x?: number;
    y?: number;
}

export const Vector = {
    rotate(vector: Vector, direction: "L" | "R"): Vector {
        if (direction === "R") { return { x: +vector.y, y: -vector.x }; }
        if (direction === "L") { return { x: -vector.y, y: +vector.x }; }
        throw new Error("Invalid direction");
    },
    translate(vector: Vector, { x = 0, y = 0 }: Move): Vector {
        return { x: vector.x + x, y: vector.y + y };
    }
};
