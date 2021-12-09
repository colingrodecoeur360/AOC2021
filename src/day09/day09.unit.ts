import { expect } from "@test/unit";
import { loadInput, splitLines } from "../utils";
import { part1, part2, parseLine } from "./day09";

describe("day09", () => {
    let values: any;

    beforeEach(() => {
        const input = loadInput("day09", { filename: "inputTest" });
        values = splitLines(input).map(parseLine);
    });
    describe("part1", () => {
        it("should return the sum of risk levels of low points", () => {
            expect(part1(values)).to.equal(15);
        });
    });
    describe("part2", () => {
        it("should return the product of the size of the 3 largest basins", () => {
            expect(part2(values)).to.equal(1134);
        });
    });
});
