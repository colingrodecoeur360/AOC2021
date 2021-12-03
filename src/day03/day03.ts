import { binaryNumbersToInt, loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day03() {
    const input = loadInput("day03");
    const diagnostic = splitLines(input).map(parseLine);

    return {
        part1: () => part1(diagnostic),
        part2: () => part2(diagnostic)
    };
}

export function parseLine(line: string) {
    return line.split("").map(toInt);
}

export function part1(diagnostic: number[][]) {
    const nbRows = diagnostic.length;
    const nbBits = diagnostic[0].length;

    const mostCommonBits = _.range(nbBits).map((index) => {
        const nbZeros = diagnostic.map(row => row[index]).filter(bit => bit === 0).length;
        const nbOnes = nbRows - nbZeros;
        return nbOnes > nbZeros ? 1 : 0;
    });
    const leastCommonBits = mostCommonBits.map(bit => 1 - bit);

    const gamma = binaryNumbersToInt(mostCommonBits);
    const epsilon = binaryNumbersToInt(leastCommonBits);

    return gamma * epsilon;
}

export function part2(diagnostic: number[][]) {
    const nbBits = diagnostic[0].length;

    const oxygenRow = computeLastRemainingRow(getMostCommonBit);
    const scrubberRow = computeLastRemainingRow(getLeastCommonBit);

    const oxygenRating = binaryNumbersToInt(oxygenRow);
    const scrubberRating = binaryNumbersToInt(scrubberRow);

    return oxygenRating * scrubberRating;


    function computeLastRemainingRow(getRelevantBit: (nbZeros: number, nbOnes: number) => 0 | 1) {
        let remainingRows = diagnostic;
        for (let index = 0; index < nbBits; index++) {
            const nbZeros = remainingRows.map(row => row[index]).filter(bit => bit === 0).length;
            const nbOnes = remainingRows.length - nbZeros;
            const relevantBit = getRelevantBit(nbZeros, nbOnes);

            remainingRows = remainingRows.filter(row => row[index] === relevantBit);

            if (remainingRows.length === 1) { return remainingRows[0]; }
        }
        throw new Error("No row remaining");
    }
    function getMostCommonBit(nbZeros: number, nbOnes: number) {
        return nbZeros > nbOnes ? 0 : 1;
    }
    function getLeastCommonBit(nbZeros: number, nbOnes: number) {
        return nbOnes < nbZeros ? 1 : 0;
    }
}
