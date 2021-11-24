import { loadInput } from "../utils";

export function example() {
    const input = loadInput("example");
    return input.split(",")[0];
}
