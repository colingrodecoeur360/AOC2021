import { loadInput, splitIntegerLines } from "../utils";
import _ from "lodash";

export function day01() {
    const input = loadInput("day01");
    const numbers = splitIntegerLines(input);

    return {
        part1: () => part1(numbers),
        part2: () => part2(numbers)
    };
}

export function part1(numbers: number[]) {
    let nbIncreases = 0;
    let currentNumber = numbers[0];
    numbers.forEach((n) => {
        if(n > currentNumber) {
            nbIncreases++;
        }
        currentNumber = n;
    })
    return nbIncreases;
}

export function part2(numbers: number[]) {
    const WINDOW_SIZE = 3;

    const sums = numbers.slice(WINDOW_SIZE - 1).map((n, index) => {
        const window = numbers.slice(index, index + WINDOW_SIZE);
        return _.sum(window);
    });

    return part1(sums);
}
