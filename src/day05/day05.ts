import { loadInput, splitLines, toInt } from "../utils";

type Point = [number, number];
type Line = [Point, Point];
type Grid = Record<string, number>;

export function day05() {
    const input = loadInput("day05");
    const lines = splitLines(input).map(parseLine);

    return {
        part1: () => part1(lines),
        part2: () => part2(lines)
    };
}

export function parseLine(line: string) {
    return line.split("->").map(point => point.split(",").map(toInt)) as Line;
}

export function part1(lines: Line[]) {
    const grid: Grid = {};

    lines.forEach((line) => {
        const [[x1, y1], [x2, y2]] = line;
        if (x1 === x2) {
            markHorizontalLine(line, grid);
        } else if (y1 === y2) {
            markVerticalLine(line, grid);
        }
    });

    return countIntersections(grid);
}

export function part2(lines: Line[]) {
    const grid: Grid = {};

    lines.forEach((line) => {
        const [[x1, y1], [x2, y2]] = line;
        if (x1 === x2) {
            markHorizontalLine(line, grid);
        } else if (y1 === y2) {
            markVerticalLine(line, grid);
        } else {
            markDiagonalLine(line, grid);
        }
    });

    return countIntersections(grid);
}

function markHorizontalLine(line: Line, grid: Grid) {
    let [[x1, y1], [, y2]] = line;
    [y1, y2] = [Math.min(y1, y2), Math.max(y1, y2)];
    for (let j = y1; j <= y2; j++) {
        const key = getKey(x1, j);
        grid[key] = (grid[key] || 0) + 1;
    }
}

function markVerticalLine(line: Line, grid: Grid) {
    let [[x1, y1], [x2, ]] = line;
    [x1, x2] = [Math.min(x1, x2), Math.max(x1, x2)];
    for (let i = x1; i <= x2; i++) {
        const key = getKey(i, y1);
        grid[key] = (grid[key] || 0) + 1;
    }
}

function markDiagonalLine(line: Line, grid: Grid) {
    const [[x1, y1], [x2, y2]] = line;
    const direction = [x2 > x1 ? 1 : -1, y2 > y1 ? 1 : -1]
    const nbSteps = Math.abs(x2 - x1);

    for (let step = 0; step <= nbSteps; step++) {
        const key = getKey(x1 + step * direction[0], y1 + step * direction[1]);
        grid[key] = (grid[key] || 0) + 1;
    }
}

function getKey(x: number, y: number) {
    return `${x}-${y}`;
}

function countIntersections(grid: Grid) {
    return Object.values(grid).filter(value => value > 1).length;
}
