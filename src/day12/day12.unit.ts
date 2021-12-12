import { expect } from "@test/unit";
import { loadInput, splitLines } from "../utils";
import { parseLine, part1, part2 } from "./day12";

describe("day12", () => {
    let edges1: any[];
    let edges2: any[];
    let edges3: any[];

    beforeEach(() => {
        edges1 = splitLines(loadInput("day12", { filename: "inputTest1" })).map(parseLine);
        edges2 = splitLines(loadInput("day12", { filename: "inputTest2" })).map(parseLine);
        edges3 = splitLines(loadInput("day12", { filename: "inputTest3" })).map(parseLine);
    });

    describe("part1", () => {
        it("should return the number of distinct paths on example 1", () => {
            expect(part1(edges1)).to.equal(10);
        });
        it("should return the number of distinct paths on example 2", () => {
            expect(part1(edges2)).to.equal(19);
        });
        it("should return the number of distinct paths on example 3", () => {
            expect(part1(edges3)).to.equal(226);
        });
    });
    describe("part2", () => {
        it("should return the number of distinct paths on example 1", () => {
            expect(part2(edges1)).to.equal(36);
        });
        it("should return the number of distinct paths on example 2", () => {
            expect(part2(edges2)).to.equal(103);
        });
        it("should return the number of distinct paths on example 3", () => {
            expect(part2(edges3)).to.equal(3509);
        });
    });
});
