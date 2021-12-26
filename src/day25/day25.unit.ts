import { expect } from "@test/unit";
import { loadInput, splitLines } from "../utils";
import { parseLine, part1 } from "./day25";

describe("day25", () => {
    describe("part1", () => {
        it("should return the first step on which no sea cucumbers move", () => {
            const input = loadInput("day25", { filename: "inputTest1" });
            const lines = splitLines(input).map(parseLine);

            expect(part1(lines)).to.equal(58);
        });
    });
});
