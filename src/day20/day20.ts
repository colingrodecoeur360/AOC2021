import { binaryNumbersToInt, loadInput, splitLines } from "../utils";
import _ from "lodash";

export function day20() {
    const input = loadInput("day20");
    const { algorithm, image } = parseInput(input);

    return {
        part1: () => part1(algorithm, image),
        part2: () => part2(algorithm, image)
    };
}

export function parseInput(input: any) {
    const lines = splitLines(input);

    return {
        algorithm: lines[0].split("") as Pixel[],
        image: lines.slice(2).map(line => line.split("") as Pixel[])
    };
}

type Pixel = "#" | ".";

export function part1(algorithm: Pixel[], image: Pixel[][]) {
    return new Enhancer(algorithm, image).enhance2NTimes(1).countLitPixels();
}

export function part2(algorithm: Pixel[], image: Pixel[][]) {
    return new Enhancer(algorithm, image).enhance2NTimes(25).countLitPixels();
}

class Enhancer {
    algorithm: Pixel[];
    image: Pixel[][];

    constructor(algorithm: Pixel[], image: Pixel[][]) {
        this.algorithm = algorithm;
        this.image = image;
    }

    pad(n: number) {
        const size = this.image.length;
        const newImage: Pixel[][] = [];

        for (let i = 0; i < n; i++) {
            const row = buildEmptyCells(size + 2 * n);
            newImage.push(row);
        }

        for (let i = 0; i < size; i++) {
            const row = [
                ...buildEmptyCells(n),
                ...this.image[i],
                ...buildEmptyCells(n)
            ];
            newImage.push(row);
        }

        for (let i = 0; i < n; i++) {
            const row = buildEmptyCells(size + 2 * n);
            newImage.push(row);
        }

        this.image = newImage;

        function buildEmptyCells(nCells: number): Pixel[] {
            return _.range(nCells).map(() => "." as Pixel)
        }
    }

    crop() {
        const size = this.image.length;
        const newImage: Pixel[][] = [];

        for (let i = 1; i < size - 1; i++) {
            newImage.push(this.image[i].slice(1, size - 1));
        }

        this.image = newImage;
    }

    enhance2NTimes(n: number) {
        for (let step = 0; step < n; step++) {
            this.pad(3);
            this.enhance();
            this.enhance();
            this.crop();
        }
        return this;
    }

    enhance() {
        const size = this.image.length;

        const newImage: Pixel[][] = Array.from({ length: size }).map(() => {
            return Array.from<Pixel>({ length: size }).fill(this.algorithm[0]);
        });

        for (let i = 1; i < size - 1; i++) {
            for (let j = 1; j < size - 1; j++) {
                const cells = [
                    ...this.image[i - 1].slice(j - 1, j + 2),
                    ...this.image[i].slice(j - 1, j + 2),
                    ...this.image[i + 1].slice(j - 1, j + 2)
                ];
                const position = binaryNumbersToInt(cells.map(x => x === "#" ? 1 : 0));
                newImage[i][j] = this.algorithm[position];
            }
        }

        this.image = newImage;
    }

    countLitPixels() {
        return this.image.flat().filter(cell => cell === "#").length;
    }
}
