import fs from "fs";
import path from "path";
import { toInt } from "./micro";

export function loadInput(folder: string, { filename = "input" }: { filename?: string } = {}) {
    const filePath = path.resolve(__dirname, `../${folder}/${filename}.txt`);
    return fs.readFileSync(filePath, { encoding: "utf8" });
}

export function splitLines(input: string) {
    return input.trim().split("\n");
}

export function splitParagraphs(input: string) {
    return input.trim().split("\n\n");
}

export function splitIntegerLines(input: string) {
    return splitLines(input).map(toInt);
}
