import { expect } from "@test/unit";
import { parseLine, part1, part2 } from "./day11";
import { loadInput, splitLines } from "../utils";

describe("day11", () => {
    let lines: any[];

    beforeEach(() => {
        const input = loadInput("day11", { filename: "inputTest" });
        lines = splitLines(input).map(parseLine);
    });

    describe("part1", () => {
        it("should return the number of flashes after 100 steps", () => {
            expect(part1(lines)).to.equal(1656);
        });
    });
    describe("part2", () => {
        it("should return the first step in which all octopuses flash", () => {
            expect(part2(lines)).to.equal(195);
        });
    });
});
