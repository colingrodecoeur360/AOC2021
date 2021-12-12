import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

type Cell = [number, number];

export function day11() {
    const input = loadInput("day11");
    const lines = splitLines(input).map(parseLine);

    return {
        part1: () => part1(lines),
        part2: () => part2(lines)
    };
}

export function parseLine(line: string) {
    return line.split("").map(toInt);
}

export function part1(lines: number[][]) {
    const grid = new Grid(lines);

    let nbFlashes = 0;
    _.range(100).forEach(() => {
        nbFlashes += grid.executeStep();
    });

    return nbFlashes;
}

export function part2(lines: number[][]) {
    const grid = new Grid(lines);
    const gridSize = grid.getSize();

    let step = 0;
    while (true) {
        step++;
        const nbFlashes = grid.executeStep();
        if (nbFlashes === gridSize) {
            return step;
        }
    }
}

class Grid {
    levels: number[][];

    constructor(levels: number[][]) {
        this.levels = _.cloneDeep(levels);
    }

    increaseEnergyLevel(cell: Cell) {
        const [i, j] = cell;
        this.levels[i][j]++;
    }

    increaseEnergyLevels(cells: Cell[]) {
        cells.forEach(this.increaseEnergyLevel, this);
    }

    resetEnergyLevel(cell: Cell) {
        const [i, j] = cell;
        this.levels[i][j] = 0;
    }

    resetEnergyLevels(cells: Cell[]) {
        cells.forEach(this.resetEnergyLevel, this);
    }

    getSize() {
        const [nr, nc] = [this.levels.length, this.levels[0].length];
        return nr * nc;
    }

    executeStep() {
        const allCells = this.levels.flatMap((row, i) => row.map((value, j) => [i, j] as Cell));
        this.increaseEnergyLevels(allCells);
        const flashedCells = this.flash();
        this.resetEnergyLevels(flashedCells);
        return flashedCells.length;
    }

    flash() {
        const flashedCells = new Set<string>();
        let currentNbFlashes = 0;
        do {
            currentNbFlashes = flashedCells.size;
            this.levels.forEach((row, i) => {
                row.forEach((value, j) => {
                    if (value <= 9) { return; }
                    if (flashedCells.has(toKey(i, j))) { return; }
                    this.increaseEnergyLevels(this.getNeighbors([i, j]));
                    flashedCells.add(toKey(i, j));
                });
            });
        } while (flashedCells.size > currentNbFlashes);
        return [...flashedCells].map(fromKey);
    }

    getNeighbors(cell: Cell) {
        const [i, j] = cell;
        const [nr, nc] = [this.levels.length, this.levels[0].length];
        const neighbors: Cell[] = [];
        const deltas = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        deltas.forEach(([iDelta, jDelta]) => {
            if (i + iDelta < 0) { return; }
            if (i + iDelta > nr - 1) { return; }
            if (j + jDelta < 0) { return; }
            if (j + jDelta > nc - 1) { return; }
            neighbors.push([i + iDelta, j + jDelta]);
        });
        return neighbors;
    }
}

function toKey(i: number, j: number) {
    return `${i}-${j}`;
}
function fromKey(key: string) {
    return key.split("-").map(toInt) as Cell;
}
