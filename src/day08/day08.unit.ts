import { expect } from "@test/unit";
import { loadInput, splitLines } from "../utils";
import { part1, part2, parseLine } from "./day08";

describe("day08", () => {
    const input = splitLines(loadInput("day08", { filename: "inputTest" })).map(parseLine);

    describe("part1", () => {
        it("should return the occurrences of digits with a unique number of segments", () => {
            expect(part1(input)).to.equal(26);
        });
    });
    describe("part2", () => {
        it("should return the sum of output values", () => {
            expect(part2(input)).to.equal(61229);
        });
    });
});
