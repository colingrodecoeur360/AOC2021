import { expect } from "@test/unit";
import { toInt } from "../utils";
import { part1, part2 } from "./day07";

describe("day07", () => {
    let positions: any;

    beforeEach(async () => {
        positions = "16,1,2,0,4,2,7,1,2,14".split(",").map(toInt)
    });

    describe("part1", () => {
        it("should return the minimal consumption of fuel", () => {
            expect(part1(positions)).to.equal(37);
        });
    });
    describe("part2", () => {
        it("should return the minimal consumption of fuel", () => {
            expect(part2(positions)).to.equal(168);
        });
    });
});
