import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day15() {
    const input = loadInput("day15");
    const levels = splitLines(input).map(parseLine);

    return {
        part1: () => part1(levels),
        part2: () => part2(levels)
    };
}

export function parseLine(line: string) {
    return line.split("").map(toInt);
}

export function part1(levels: number[][]) {
    const grid = new Grid(levels);
    return grid.getShortestPath();
}

export function part2(levels: number[][]) {
    const fullLevels = replicateGrid(levels, 5);
    const grid = new Grid(fullLevels);
    return grid.getShortestPath();
}

function replicateGrid(levels: number[][], n: number) {
    const fullLevels: number[][] = [];
    for (let i = 0; i < n; i++) {
        levels.forEach((row) => {
            const fullRow: number[] = [];
            for (let j = 0; j < n; j++) {
                row.forEach((value) => {
                    fullRow.push(1 + (value + i + j - 1) % 9);
                });
            }
            fullLevels.push(fullRow);
        });
    }
    return fullLevels;
}

type Cell = [number, number];

class Grid {
    levels: number[][];
    distances: number[][];
    currentCell: Cell;
    visitedCells: Set<string>;
    cellsToVisit: Record<string, number>;

    constructor(levels: number[][]) {
        this.levels = levels;
        this.visitedCells = this.initializeVisitedCells();
        this.cellsToVisit = this.initializeCellsToVisit();
        this.distances = this.initializeDistances();
        this.currentCell = [0, 0];
    }

    getShortestPath() {
        const [sizeI, sizeJ] = this.getSize();

        while (true) {
            const [i, j] = this.currentCell;
            if (i === sizeI - 1 && j === sizeJ - 1) { break; }
            this.updateNeighbors();
            this.updateCurrentCell();
        }

        return this.distances[sizeI - 1][sizeJ - 1]
    }

    getSize() {
        return [this.levels.length, this.levels[0].length];
    }

    initializeVisitedCells() {
        return new Set(["0-0"]);
    }
    initializeCellsToVisit() {
        return {
            "0-1": Infinity,
            "1-0": Infinity
        };
    }

    initializeDistances() {
        const [nr, nc] = this.getSize();
        const distances = Array.from({ length: nr }).map(() => {
            return Array.from<number>({ length: nc }).fill(Infinity);
        });
        distances[0][0] = 0;
        return distances;
    }

    getNeighbors() {
        const [i, j] = this.currentCell;
        const [nr, nc] = this.getSize();
        return [
            ...(i > 0 ? [[i - 1, j]] : []),
            ...(i < nr - 1 ? [[i + 1, j]] : []),
            ...(j > 0 ? [[i, j - 1]] : []),
            ...(j < nc - 1 ? [[i, j + 1]] : []),
        ] as Cell[];
    }

    getUnvisitedNeighbors() {
        return this.getNeighbors().filter(([i, j]) => ! this.visitedCells.has(`${i}-${j}`));
    }

    updateNeighbors() {
        const unvisitedNeighbors = this.getUnvisitedNeighbors();
        const [currentI, currentJ] = this.currentCell;
        unvisitedNeighbors.forEach(([i, j]) => {
            this.distances[i][j] = Math.min(
                this.distances[i][j],
                this.distances[currentI][currentJ] + this.levels[i][j]
            );
            this.cellsToVisit[`${i}-${j}`] = this.distances[i][j];
        });
    }

    updateCurrentCell() {
        const [currentI, currentJ] = this.currentCell;
        this.visitedCells.add(`${currentI}-${currentJ}`);
        delete this.cellsToVisit[`${currentI}-${currentJ}`];
        this.currentCell = this.getClosestUnvisitedCell();
    }

    getClosestUnvisitedCell() {
        const closest = _.minBy(Object.entries(this.cellsToVisit), ([, distance]) => distance);
        return closest![0].split("-").map(toInt) as Cell;
    }
}
