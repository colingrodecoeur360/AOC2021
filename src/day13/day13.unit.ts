import { expect } from "@test/unit";
import { loadInput, splitLines } from "../utils";
import { parseInput, part1, part2 } from "./day13";

describe("day13", () => {
    let instructions: any;

    beforeEach(() => {
        const input = loadInput("day13", { filename: "inputTest1" });
        instructions = parseInput(splitLines(input));
    });

    describe("part1", () => {
        it("should return the number of dots", () => {
            expect(part1(instructions)).to.equal(17);
        });
    });

    describe("part2", () => {
        it("should return the number of columns in the result", () => {
            expect(part2(instructions)).to.equal(5);
        });
    });
});
