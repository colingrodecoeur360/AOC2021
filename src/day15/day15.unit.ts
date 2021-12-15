import { expect } from "@test/unit";
import { parseLine, part1, part2 } from "./day15";
import { loadInput, splitLines } from "../utils";

describe("day15", () => {
    let levels: any;

    beforeEach(() => {
        const input = loadInput("day15", { filename: "inputTest1" });
        levels = splitLines(input).map(parseLine);
    });

    describe("part1", () => {
        it("should return 1", () => {
            expect(part1(levels)).to.equal(40);
        });
    });
    describe("part2", () => {
        it("should return 2", () => {
            expect(part2(levels)).to.equal(315);
        });
    });
});
