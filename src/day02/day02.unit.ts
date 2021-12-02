import { expect } from "@test/unit";
import { part1, part2, parseLine } from "./day02";

describe("day02", () => {
    let instructions: any;

    beforeEach(() => {
        const input = [
            "forward 5",
            "down 5",
            "forward 8",
            "up 3",
            "down 8",
            "forward 2"
        ];
        instructions = input.map(parseLine);
    });

    describe("part1", () => {
        it("should return the final position * depth", () => {
            expect(part1(instructions)).to.equal(150);
        });
    });
    describe("part2", () => {
        it("should return the final position * depth", () => {
            expect(part2(instructions)).to.equal(900);
        });
    });
});
