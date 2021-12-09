import { loadInput, multiply, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day09() {
    const input = loadInput("day09");
    const heights = splitLines(input).map(parseLine);

    return {
        part1: () => part1(heights),
        part2: () => part2(heights)
    };
}

export function parseLine(line: string) {
    return line.split("").map(toInt);
}

type Cell = [number, number];

class HeightMap {
    heights: number[][];

    constructor(heights: number[][]) {
        this.heights = heights;
    }

    getHeight(cell: Cell) {
        const [i, j] = cell;
        return this.heights[i][j];
    }

    getNeighbors(cell: Cell) {
        const [i, j] = cell;
        const [nr, nc] = [this.heights.length, this.heights[0].length];
        return [
            ...(i > 0 ? [[i - 1, j]] : []),
            ...(i < nr - 1 ? [[i + 1, j]] : []),
            ...(j > 0 ? [[i, j - 1]] : []),
            ...(j < nc - 1 ? [[i, j + 1]] : []),
        ] as Cell[];
    }

    isVisited(cell: Cell) {
        const [i, j] = cell;
        return this.heights[i][j] === -1;
    }

    isHighestPoint(cell: Cell) {
        const [i, j] = cell;
        return this.heights[i][j] === 9;
    }

    markCellAsVisited(cell: Cell) {
        const [i, j] = cell;
        this.heights[i][j] = -1;
    }

    getLowPoints() {
        const lowPoints: Cell[] = [];
        this.heights.forEach((line, i) => {
            line.forEach((height, j) => {
                const neighbors = this.getNeighbors([i, j]);
                if (neighbors.some(neighbor => this.getHeight(neighbor) <= height)) { return; }
                lowPoints.push([i, j])
            })
        });
        return lowPoints;
    }
}

export function part1(heights: number[][]) {
    const heightMap = new HeightMap(heights);
    const lowPoints = heightMap.getLowPoints();

    return _.sum(lowPoints.map(point => 1 + heightMap.getHeight(point)));
}

export function part2(heights: number[][]) {
    const heightMap = new HeightMap(heights);
    const lowPoints = heightMap.getLowPoints();

    const basins = lowPoints.map(getBasin);
    basins.sort((basin1, basin2) => basin2.length - basin1.length);

    return multiply(basins.slice(0, 3).map(basin => basin.length));


    function getBasin(lowPoint: Cell) {
        heightMap.markCellAsVisited(lowPoint);

        const queue = [lowPoint];
        const basin = [lowPoint];

        while (queue.length) {
            const currentPoint = queue.shift()!;
            const neighbors = heightMap.getNeighbors(currentPoint);
            neighbors.forEach((neighbor) => {
                if (shouldVisit(neighbor)) {
                    queue.push(neighbor);
                    basin.push(neighbor);
                }
                heightMap.markCellAsVisited(neighbor);

            });

            function shouldVisit(neighbor: Cell) {
                if (heightMap.isVisited(neighbor)) { return false; }
                if (heightMap.isHighestPoint(neighbor)) { return false; }
                return heightMap.getHeight(neighbor) > heightMap.getHeight(currentPoint);
            }
        }

        return basin;
    }
}
