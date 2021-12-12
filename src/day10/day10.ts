import { loadInput, median, splitLines } from "../utils";
import _ from "lodash";

const PAIRS: Record<string, string> = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}

const ERROR_SCORES: Record<string, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
};

const AUTOCOMPLETE_SCORES: Record<string, number> = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
};

export function day10() {
    const input = loadInput("day10");
    const lines = splitLines(input).map(parseLine);

    return {
        part1: () => part1(lines),
        part2: () => part2(lines)
    };
}

export function parseLine(line: string) {
    return line.split("");
}

export function part1(lines: string[][]) {
    return _.sum(lines
        .map(getFirstCorruptChar)
        .map(getErrorScore)
    );
}

export function part2(lines: string[][]) {
    const scores: number[] = [];
    lines.forEach((line) => {
        if (getFirstCorruptChar(line)) { return; }
        const missingChars = getMissingChars(line);
        scores.push(getAutocompleteScore(missingChars));
    });
    return median(scores);
}

function getFirstCorruptChar(line: string[]) {
    const openingChars: string[] = [];
    for (const char of line) {
        if (isOpeningChar(char)) {
            openingChars.push(char);
        } else {
            if (isMatchingClosingChar(char, openingChars.pop()!)) { continue; }
            return char;
        }
    }
    return null;
}
function isOpeningChar(char: string) {
    return !! PAIRS[char];
}
function isMatchingClosingChar(char: string, openingChar: string) {
    return PAIRS[openingChar] === char;
}
function getMissingChars(line: string[]) {
    const openingChars: string[] = [];
    for (const char of line) {
        if (isOpeningChar(char)) {
            openingChars.push(char);
        } else {
            openingChars.pop();
        }
    }
    return openingChars.map(char => PAIRS[char]).reverse();
}
function getErrorScore(char: string | null) {
    if (char === null) { return 0; }
    return ERROR_SCORES[char];
}
function getAutocompleteScore(missingChars: string[]) {
    let score = 0;
    missingChars.forEach((char) => {
        score *= 5;
        score += AUTOCOMPLETE_SCORES[char];
    });
    return score;
}
