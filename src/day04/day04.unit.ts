import { expect } from "@test/unit";
import { part1, part2, parseInput } from "./day04";
import { loadInput, splitLines } from "../utils";

describe("day04", () => {
    let numbers: any;
    let boards: any;

    beforeEach(() => {
        const input = loadInput("day04", { filename: "inputTest" });
        const parsedInput = parseInput(splitLines(input));
        numbers = parsedInput.numbers;
        boards = parsedInput.boards;
    });

    describe("part1", () => {
        it("should return the first winner's score", () => {
            expect(part1(numbers, boards)).to.equal(4512);
        });
    });
    describe("part2", () => {
        it("should return last winner's score", () => {
            expect(part2(numbers, boards)).to.equal(1924);
        });
    });
});
