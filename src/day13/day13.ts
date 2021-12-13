import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day13() {
    const input = loadInput("day13");
    const instructions = parseInput(splitLines(input));

    return {
        part1: () => part1(instructions),
        part2: () => part2(instructions)
    };
}

type Dot = [number, number];
type Fold = { axis: "x" | "y", value: number; };

export function parseInput(lines: string[]) {
    const dots: Dot[] = [];
    const folds: Fold[] = [];
    lines.forEach((line) => {
        if (! line.trim()) { return; }
        if (line.startsWith("fold")) {
            const [axis, value] = line.replace("fold along ", "").split("=");
            folds.push({
                axis: axis as "x" | "y",
                value: toInt(value)
            });
        } else {
            dots.push(line.split(",").map(toInt) as Dot);
        }
    })
    return { dots, folds };
}

export function part1({ dots, folds }: { dots: Dot[]; folds: Fold[] }) {
    let newDots = _.cloneDeep(dots);

    newDots = applyFold(newDots, folds[0]);

    const matrix = computeMatrix(newDots);
    return _.countBy(matrix.flat())["#"];
}

export function part2({ dots, folds }: { dots: Dot[]; folds: Fold[] }) {
    let newDots = _.cloneDeep(dots);

    folds.forEach(fold => newDots = applyFold(newDots, fold));

    const matrix = computeMatrix(newDots);

    // Uncomment to display the 8-letter code
    // The return value is only there for testing/debugging purposes
    // console.log(matrix.map(row => row.join("")));

    return matrix[0].length;
}

function applyFold(dots: Dot[], fold: Fold): Dot[] {
    return dots.map(([i, j]) => {
        return [
            fold.axis === "x" && i > fold.value ? 2 * fold.value - i : i,
            fold.axis === "y" && j > fold.value ? 2 * fold.value - j : j
        ];
    });
}

function computeMatrix(dots: Dot[]) {
    const iMax = _.max(dots.map(dot => dot[1]))! + 1;
    const jMax = _.max(dots.map(dot => dot[0]))! + 1;

    const matrix = _.range(iMax).map(() => _.range(jMax).map(() => "."));

    dots.forEach(([i, j]) => matrix[j][i] = "#");

    return matrix;
}
