import { expect } from "@test/unit";
import { part1, part2 } from "./day17";

describe("day17", () => {
    let input: string;

    beforeEach(() => {
        input = "target area: x=20..30, y=-10..-5";
    });

    describe("part1", () => {
        it("should return the max height", () => {
            expect(part1(input)).to.equal(45);
        });
    });
    describe("part2", () => {
        it("should return the number of valid velocities", () => {
            expect(part2(input)).to.equal(112);
        });
    });
});
