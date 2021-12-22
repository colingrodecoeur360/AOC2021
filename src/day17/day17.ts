import { loadInput, toInt } from "../utils";
import _ from "lodash";

export function day17() {
    const input = loadInput("day17");

    return {
        part1: () => part1(input),
        part2: () => part2(input)
    };
}

export function part1(input: string) {
    const velocities = computeValidVelocities(input);
    const maxHeights = velocities.map(([, vy]) => vy * (vy + 1) / 2);
    return _.max(maxHeights);
}

export function part2(input: string) {
    const velocities = computeValidVelocities(input);
    return velocities.length;
}

function parseInput(input: string) {
    const regex = /target area: x=([-0-9]+)..([-0-9]+), y=([-0-9]+)..([-0-9]+)/;
    const [, xMin, xMax, yMin, yMax] = input.match(regex)!;
    return [xMin, xMax, yMin, yMax].map(toInt);
}

function computeValidVelocities(input: string) {
    const [xMin, xMax, yMin, yMax] = parseInput(input);
    const velocities: [number, number][] = [];

    for (let vxInitial = 1; vxInitial <= xMax; vxInitial++) {
        for (let vyInitial = yMin; vyInitial <= -yMin; vyInitial++) {
            let x = 0, y = 0, vx = vxInitial, vy = vyInitial;

            while (x <= xMax && y >= yMin) {
                x += vx;
                y += vy;
                if (vx > 0) { vx--; }
                vy--;

                if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
                    velocities.push([vxInitial, vyInitial]);
                    break;
                }
            }
        }
    }

    return velocities;
}
