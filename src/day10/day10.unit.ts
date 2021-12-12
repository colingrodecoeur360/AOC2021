import { expect } from "@test/unit";
import { loadInput, splitLines } from "../utils";
import { parseLine, part1, part2 } from "./day10";

describe("day10", () => {
    let lines: any[];

    beforeEach(() => {
        const input = loadInput("day10", { filename: "inputTest" });
        lines = splitLines(input).map(parseLine);
    });

    describe("part1", () => {
        it("should return 1", () => {
            expect(part1(lines)).to.equal(26397);
        });
    });
    describe("part2", () => {
        it("should return 2", () => {
            expect(part2(lines)).to.equal(288957);
        });
    });
});
