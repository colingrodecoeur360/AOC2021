import { loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day25() {
    const input = loadInput("day25");
    const lines = splitLines(input).map(parseLine);

    return {
        part1: () => part1(lines)
    };
}

export function parseLine(line: string) {
    return line.split("");
}

export function part1(lines: string[][]) {
    const grid = new Grid(lines);

    let nbSteps = 1;

    while (true) {
        if (! grid.moveCucumbers()) { break; }
        nbSteps++;
    }

    return nbSteps;
}

class Grid {
    values: string[][];

    constructor(values: string[][]) {
        this.values = _.cloneDeep(values);
    }

    moveEastFacingCucumbers() {
        const nc = this.values[0].length;
        const newValues = _.cloneDeep(this.values);

        this.values.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value === ">") {
                    const neighbor = this.values[i][(j + 1) % nc];
                    if (neighbor === ".") {
                        newValues[i][(j + 1) % nc] = ">";
                        newValues[i][j] = ".";
                    }
                }
            });
        });

        this.values = newValues;
    }

    moveSouthFacingCucumbers() {
        const nr = this.values.length;
        const newValues = _.cloneDeep(this.values);

        this.values.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value === "v") {
                    const neighbor = this.values[(i + 1) % nr][j];
                    if (neighbor === ".") {
                        newValues[(i + 1) % nr][j] = "v";
                        newValues[i][j] = ".";
                    }
                }
            });
        });

        this.values = newValues;
    }

    moveCucumbers() {
        const valuesBefore = JSON.stringify(this.values);
        this.moveEastFacingCucumbers();
        this.moveSouthFacingCucumbers();
        const valuesAfter = JSON.stringify(this.values);
        return valuesBefore !== valuesAfter;
    }
}
