import { expect } from "@test/unit";
import { parseLine, part1, part2 } from "./day05";

describe("day05", () => {
    let lines: any;

    beforeEach(async () => {
        const input = [
            "0,9 -> 5,9",
            "8,0 -> 0,8",
            "9,4 -> 3,4",
            "2,2 -> 2,1",
            "7,0 -> 7,4",
            "6,4 -> 2,0",
            "0,9 -> 2,9",
            "3,4 -> 1,4",
            "0,0 -> 8,8",
            "5,5 -> 8,2"
        ];
        lines = input.map(parseLine);
    });

    describe("part1", () => {
        it("should return the number of intersections", () => {
            expect(part1(lines)).to.equal(5);
        });
    });
    describe("part2", () => {
        it("should return the number of intersections", () => {
            expect(part2(lines)).to.equal(12);
        });
    });
});
