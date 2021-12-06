import { loadInput, toInt } from "../utils";
import _ from "lodash";

export function day06() {
    const input = loadInput("day06");
    const timers = input.split(",").map(toInt);

    return {
        part1: () => part1(timers),
        part2: () => part2(timers)
    };
}

export function part1(timers: number[]) {
    const nFishByTimer = reproduce(timers, 80);
    return _.sum(nFishByTimer);
}

export function part2(timers: number[]) {
    const nFishByTimer = reproduce(timers, 256);
    return _.sum(nFishByTimer);
}

function reproduce(timers: number[], nDays: number) {
    let nFishByTimer = _.range(9).map(timer => timers.filter(n => n === timer).length);

    for (let day = 0; day < nDays; day++) {
        nFishByTimer = [
            ...nFishByTimer.slice(1, 7),
            nFishByTimer[7] + nFishByTimer[0],
            nFishByTimer[8],
            nFishByTimer[0]
        ]
    }

    return nFishByTimer;
}
