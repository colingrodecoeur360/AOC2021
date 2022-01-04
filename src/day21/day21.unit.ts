import { expect } from "@test/unit";
import { parseInput, part1, part2 } from "./day21";
import { loadInput } from "../utils";

describe("day21", () => {
    describe("part1", () => {
        it("should return the loser's end score times the number of dice rolls", () => {
            const input = loadInput("day21", { filename: "inputTest1" });
            const [pos1, pos2] = parseInput(input);

            expect(part1(pos1, pos2)).to.equal(739785);
        });
    });
    describe("part2", () => {
        it("should return the number of universes in which the best player wins", () => {
            const input = loadInput("day21", { filename: "inputTest1" });
            const [pos1, pos2] = parseInput(input);

            expect(part2(pos1, pos2)).to.equal(444356092776315);
        });
    });
});
