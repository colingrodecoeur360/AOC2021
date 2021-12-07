import { loadInput, toInt } from "../utils";
import _ from "lodash";

export function day07() {
    const input = loadInput("day07");
    const positions = input.split(",").map(toInt);

    return {
        part1: () => part1(positions),
        part2: () => part2(positions)
    };
}

export function part1(positions: number[]) {
    return getMinimalConsumption(positions, getFuelConsumption);

    function getFuelConsumption(position1: number, position2: number) {
        return Math.abs(position1 - position2);
    }
}

export function part2(positions: number[]) {
    return getMinimalConsumption(positions, getFuelConsumption);

    function getFuelConsumption(position1: number, position2: number) {
        const distance = Math.abs(position1 - position2);
        return distance * (distance + 1) / 2;
    }
}

function getMinimalConsumption(
    positions: number[],
    getFuelConsumption: (position1: number, position2: number) => number
) {
    const destinations = _.range(Math.min(...positions), Math.max(...positions));

    const consumptions = destinations.map((destination) => {
        return positions.reduce((consumption, position) => {
            return consumption + getFuelConsumption(destination, position)
        }, 0);
    });

    return Math.min(...consumptions)
}
