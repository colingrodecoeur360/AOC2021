import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day20";
import { loadInput } from "../utils";

describe("day20", () => {
    describe("part1", () => {
        it("should return 1", () => {
            const input = loadInput("day20", { filename: "inputTest1" });
            const { algorithm, image } = parseInput(input);

            expect(part1(algorithm, image)).to.equal(35);
        });
    });
    describe("part2", () => {
        it("should return 2", () => {
            const input = loadInput("day20", { filename: "inputTest1" });
            const { algorithm, image } = parseInput(input);

            expect(part2(algorithm, image)).to.equal(3351);
        });
    });
});
