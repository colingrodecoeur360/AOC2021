import { loadInput, splitLines, toInt } from "../utils";

type Command = "forward" | "up" | "down";
type Instruction = {
    command: Command;
    value: number;
};

export function day02() {
    const input = loadInput("day02");
    const instructions = splitLines(input).map(parseLine);

    return {
        part1: () => part1(instructions),
        part2: () => part2(instructions)
    };
}

export function parseLine(line: string): Instruction {
    const [command, value] = line.split(" ");
    return {
        command: command as Command,
        value: toInt(value)
    }
}

export function part1(instructions: Instruction[]) {
    let position = 0;
    let depth = 0;

    instructions.forEach(({ command, value }) => {
        if (command === "forward") {
            position += value;
        }
        if (command === "up") {
            depth -= value;
        }
        if (command === "down") {
            depth += value;
        }
    })

    return position * depth;
}
export function part2(instructions: Instruction[]) {
    let position = 0;
    let depth = 0;
    let aim = 0;

    instructions.forEach(({ command, value }) => {
        if (command === "forward") {
            position += value;
            depth += aim * value;
        }
        if (command === "up") {
            aim -= value;
        }
        if (command === "down") {
            aim += value;
        }
    })

    return position * depth;
}
