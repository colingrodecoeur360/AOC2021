import { loadInput, splitLines, toInt } from "../utils";

const GRID_SIZE = 5;

type Grid = number[][];
type Marked = boolean[][];

export function day04() {
    const input = loadInput("day04");
    const x = splitLines(input);
    const { numbers, boards } = parseInput(x)

    return {
        part1: () => part1(numbers, boards),
        part2: () => part2(numbers, boards)
    };
}

export function parseInput(lines: string[]) {
    const numbers = lines[0].split(",").map(toInt);

    const grids = [];
    let grid: Grid = [];

    for(let i = 1; i < lines.length; i++) {
        if (lines[i].trim().length) {
            grid.push(lines[i].split(" ").filter(x => x).map(toInt));
        }
        if (grid.length === GRID_SIZE) {
            grids.push(grid);
            grid = [];
        }
    }

    return {
        boards: grids.map(grid => new Board(grid)),
        numbers
    };
}

class Board {
    grid: Grid;
    marked: Marked;

    constructor(grid: Grid) {
        this.grid = grid;
        this.initializeMarkedCells();
    }

    initializeMarkedCells() {
        this.marked = Array.from({ length: GRID_SIZE }).map(() => {
            return Array.from<boolean>({ length: GRID_SIZE }).fill(false);
        })
    }

    iterateCells(fn: (i: number, j: number) => void) {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                fn(i, j);
            }
        }
    }

    markNumber(n: number) {
        this.iterateCells((i, j) => {
            if (this.grid[i][j] === n) {
                this.marked[i][j] = true;
            }
        });
    }

    get isWinning() {
        for (let i = 0; i < GRID_SIZE; i++) {
            const row = this.marked[i];
            if (row.every(cell => cell)) { return true; }

            const column = this.marked.map(row => row[i]);
            if (column.every(cell => cell)) { return true; }
        }
        return false;
    }

    get unmarkedSum() {
        let sum = 0;
        this.iterateCells((i, j) => {
            if (this.marked[i][j]) { return; }
            sum += this.grid[i][j];
        })
        return sum;
    }
}


export function part1(numbers: number[], boards: Board[]) {
    for (const number of numbers) {
        for (const board of boards) {
            board.markNumber(number);
            if (! board.isWinning) { continue; }

            return board.unmarkedSum * number;
        }
    }

    throw new Error("No winning board");
}

export function part2(numbers: number[], boards: Board[]) {
    const winners = new Set<Board>();

    for (const number of numbers) {
        for (const board of boards) {
            if (winners.has(board)) { continue; }

            board.markNumber(number);
            if (! board.isWinning) { continue; }

            winners.add(board);
            if (winners.size < boards.length) { continue; }

            return board.unmarkedSum * number;
        }
    }

    throw new Error("No winning board");
}
