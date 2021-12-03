import { expect } from "@test/unit";
import { part1, part2, parseLine } from "./day03";

describe("day03", () => {
    let diagnostic: any;

    beforeEach(() => {
        const input = [
            "00100",
            "11110",
            "10110",
            "10111",
            "10101",
            "01111",
            "00111",
            "11100",
            "10000",
            "11001",
            "00010",
            "01010"
        ];
        diagnostic = input.map(parseLine);
    });

    describe("part1", () => {
        it("should return the gamma rate * epsilon rate", () => {
            expect(part1(diagnostic)).to.equal(198);
        });
    });
    describe("part2", () => {
        it("should return the oxygen rating * scrubber rating", () => {
            expect(part2(diagnostic)).to.equal(230);
        });
    });
});
