import { loadInput, splitLines, toInt } from "../utils";
import _ from "lodash";

export function day08() {
    const input = loadInput("day08");
    const lines = splitLines(input).map(parseLine);

    return {
        part1: () => part1(lines),
        part2: () => part2(lines)
    };
}

export function parseLine(line: string) {
    const [input, output] = line.split(" | ");
    return {
        input: input.split(" "),
        output: output.split(" ")
    };
}

type Line = {
    input: string[];
    output: string[];
}

export function part1(lines: Line[]) {
    return _.sum(lines.map(({ output }) => countUniquePatterns(output)));

    function countUniquePatterns(output: string[]) {
        return output.filter(isUniquePattern).length;
    }
    function isUniquePattern(pattern: string) {
        return [2, 3, 4, 7].includes(pattern.length);
    }
}

export function part2(lines: Line[]) {
    const allLetters = "abcdefg".split("");
    const digitBySegmentPositions: Record<string, number> = {
        "123567": 0,
        "36": 1,
        "13457": 2,
        "13467": 3,
        "2346": 4,
        "12467": 5,
        "124567": 6,
        "136": 7,
        "1234567": 8,
        "123467": 9
    }

    return _.sum(lines.map(getCode));

    function getCode(line: Line) {
        const { input, output } = line;
        const mapping = getMapping(input);
        return getOutputValue(output, mapping);
    }

    function getMapping(input: string[]) {
        const mapping: Record<string, string> = {};

        allLetters.forEach((letter) => {
            const occurrences = getOccurrencesOfLetter(letter);
            if (occurrences === 4) { mapping[5] = letter; } // position 5 is the only one to be present 4 times in the digits 0..9
            if (occurrences === 6) { mapping[2] = letter; } // position 2 is the only one to be present 6 times in the digits 0..9
            if (occurrences === 9) { mapping[6] = letter; } // position 6 is the only one to be present 9 times in the digits 0..9
        });

        // The digit 1 only contains 2 positions (3 and 6), and we already found position 6
        mapping[3] = [...getPatternsOfLength(2)[0]].filter(letter => letter !== mapping[6])[0];

        // The digit 7 is the digit 1 + the segment in position 1
        const seven = getPatternsOfLength(3)[0];
        const one = getPatternsOfLength(2)[0];
        mapping[1] = _.difference([...seven], [...one])[0];

        // The digit 0 is the only digit with 6 segments (0, 6, 9) not to contain any digit with 5 segments (2, 3, 5)
        const patternsOfLength6 = getPatternsOfLength(6);
        const patternsOfLength5 = getPatternsOfLength(5);
        const digit0Pattern = patternsOfLength6.filter((patternOfLength6) => {
            return patternsOfLength5.every(patternOfLength5 => _.difference([...patternOfLength5], [...patternOfLength6]).length > 0);
        })[0];
        // Position 4 is the only position not present in digit 0
        mapping[4] = _.difference(allLetters, [...digit0Pattern])[0];

        // Position 7 is the only one remaining
        mapping[7] = _.difference(allLetters, Object.values(mapping))[0];

        return mapping;

        function getOccurrencesOfLetter(letter: string) {
            return input.filter(pattern => pattern.includes(letter)).length;
        }
        function getPatternsOfLength(n: number) {
            return input.filter(pattern => pattern.length === n);
        }
    }

    function getOutputValue(output: string[], mapping: Record<string, string>) {
        const segmentsPositions = output.map(pattern => decode(pattern, mapping));
        return toInt(segmentsPositions.map(segmentPositions => digitBySegmentPositions[segmentPositions]).join(""));
    }
    function decode(pattern: string, mapping: Record<string, string>) {
        const positionByLetter = Object.fromEntries(Object.entries(mapping).map(([k, v]) => [v, k]));
        return [...pattern].map(letter => positionByLetter[letter]).sort().join("");
    }
}
