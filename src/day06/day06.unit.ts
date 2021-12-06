import { expect } from "@test/unit";
import { toInt } from "../utils";
import { part1, part2 } from "./day06";

describe("day06", () => {
    let timers: any;

    beforeEach(async () => {
        timers = "3,4,3,1,2".split(",").map(toInt)
    });

    describe("part1", () => {
        it("should return the number of lanternfish after 80 days", () => {
            expect(part1(timers)).to.equal(5934);
        });
    });
    describe("part2", () => {
        it("should return the number of lanternfish after 256 days", () => {
            expect(part2(timers)).to.equal(26984457539);
        });
    });
});
