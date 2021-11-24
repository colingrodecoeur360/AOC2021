import { solutions as expectedSolutions } from "../solutions";
import _ from "lodash";

interface Solution {
    part1?: Function;
    part2?: Function;
}

export function displaySolutions(solutions: Record<string, Solution>, { latest }: { latest: boolean }) {
    getSolutionsToDisplay().forEach(([day, solution]) => {
        if (solution.part1) { displaySolution(day, "part1"); }
        if (solution.part2) { displaySolution(day, "part2"); }
    });

    function getSolutionsToDisplay() {
        if (latest) {
            return [_.last(Object.entries(solutions))!];
        } else {
            return Object.entries(solutions);
        }
    }
    function displaySolution(day: string, part: "part1" | "part2") {
        if (! solutions[day] || ! solutions[day][part]) { return; }
        const solution = solutions[day][part]!();
        const output = `Day ${day} - ${part}: ${solution}`;
        const expectedSolution = expectedSolutions[day] && expectedSolutions[day][part];
        if (expectedSolution) {
            console.log(`${solution === expectedSolution ? "🟢" : "🔴"} ${output}`);
        } else {
            console.log(`${output}`);
        }
    }
}
