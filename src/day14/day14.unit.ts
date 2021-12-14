import { expect } from "@test/unit";
import { loadInput, splitLines } from "../utils";
import { parseInput, part1, part2 } from "./day14";

describe("day14", () => {
    let input: any;

    beforeEach(() => {
        input = parseInput(splitLines(loadInput("day14", { filename: "inputTest1" })));
    });

    describe("part1", () => {
        it("should return the difference between most and least common elements after 10 iterations", () => {
            expect(part1(input)).to.equal(1588);
        });
    });
    describe("part2", () => {
        it("should return the difference between most and least common elements after 40 iterations", () => {
            expect(part2(input)).to.equal(2188189693529);
        });
    });
});
