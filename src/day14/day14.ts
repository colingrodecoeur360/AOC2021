import { loadInput, splitLines } from "../utils";
import _ from "lodash";

type Rule = {
    left: string;
    right: string;
    inserted: string;
}
type Counter = Record<string, number>;
type Instructions = { template: string; rules: Rule[] };

export function day14() {
    const input = loadInput("day14");
    const { template, rules } = parseInput(splitLines(input));

    return {
        part1: () => part1({ template, rules }),
        part2: () => part2({ template, rules })
    };
}

export function parseInput(input: string[]) {
    const template = input[0];
    const rules = input.slice(2).map(line => {
        const [pattern, inserted] = line.split(" -> ");
        const [left, right] = pattern.split("");
        return { left, right, inserted };
    });
    return { template, rules };
}

export function part1({ template, rules }: Instructions) {
    return polymerize({ template, rules }, 10);
}

export function part2({ template, rules }: Instructions) {
    return polymerize({ template, rules }, 40);
}

function polymerize({ template, rules }: Instructions, nSteps: number) {
    let { patternsCounter, elementsCounter } = initializeCounters(template);

    for (let step = 0; step < nSteps; step++) {
        growPolymer(rules, { patternsCounter, elementsCounter });
    }

    return computeFrequencyDifference(elementsCounter);
}

function initializeCounters(template: string) {
    const elementsCounter: Counter = _.countBy(template);

    const patternsCounter: Counter = {};
    for (let i = 0; i < template.length - 1; i++) {
        const pattern = `${template[i]}${template[i + 1]}`;
        updateCounter(patternsCounter, pattern, 1);
    }

    return { elementsCounter, patternsCounter };
}

function growPolymer(rules: Rule[], { elementsCounter, patternsCounter }: { elementsCounter: Counter; patternsCounter: Counter }) {
    const deltas = Object.fromEntries(rules.map(rule => ([`${rule.left}${rule.right}`, 0])));

    for (const rule of rules) {
        const { left, right, inserted } = rule;
        const matchedPattern = `${left}${right}`;
        const insertedPatternLeft = `${left}${inserted}`;
        const insertedPatternRight = `${inserted}${right}`;
        const patternCount = patternsCounter[matchedPattern];

        if (! patternCount) { continue; }

        updateCounter(elementsCounter, inserted, patternCount);
        updateCounter(deltas, matchedPattern, -1 * patternCount);
        updateCounter(deltas, insertedPatternLeft, patternCount);
        updateCounter(deltas, insertedPatternRight, patternCount);
    }

    Object.entries(deltas).forEach(([pattern, count]) => updateCounter(patternsCounter, pattern, count));
}

function computeFrequencyDifference(elementsCounter: Counter) {
    const frequencies = Object.values(elementsCounter);
    return Math.max(...frequencies) - Math.min(...frequencies);
}

function updateCounter(counter: Counter, key: string, value: number) {
    counter[key] = (counter[key] || 0) + value;
}
