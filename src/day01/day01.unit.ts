import { expect } from "@test/unit";
import { part1, part2 } from "./day01";

describe("day01", () => {
    let numbers: number[];

    beforeEach(() => {
        numbers = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    });

    describe("part1", () => {
        it("should return the number of increases", () => {
            expect(part1(numbers)).to.equal(7);
        });
    });
    describe("part2", () => {
        it("should return the number of three-measurement sliding window increases ", () => {
            expect(part2(numbers)).to.equal(5);
        });
    });
});
