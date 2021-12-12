import { loadInput, splitLines } from "../utils";
import _ from "lodash";

interface Edge {
    node1: string;
    node2: string;
}

export function day12() {
    const input = loadInput("day12");
    const edges = splitLines(input).map(parseLine);

    return {
        part1: () => part1(edges),
        part2: () => part2(edges)
    };
}

export function parseLine(line: string): Edge {
    const [node1, node2] = line.split("-");
    return { node1, node2 };
}

export function part1(edges: Edge[]) {
    return computeNbPaths(edges, 1);
}

export function part2(edges: Edge[]) {
    return computeNbPaths(edges, 2);
}

function computeNbPaths(edges: Edge[], smallCaveVisitsLimit: number) {
    const nbVisitsBySmallCave: Record<string, number> = {};
    return applyDFS("start");

    function applyDFS(node: string): number {
        if (node === "end") { return 1; }

        incrementNbVisits(node);

        const neighbors = getNeighbors(node);
        const nbPaths = _.sum(neighbors.map(applyDFS));

        decrementNbVisits(node);

        return nbPaths;
    }
    function incrementNbVisits(node: string) {
        if (isLargeCave(node)) { return; }
        nbVisitsBySmallCave[node] = (nbVisitsBySmallCave[node] || 0) + 1;
    }
    function decrementNbVisits(node: string) {
        if (isLargeCave(node)) { return; }
        nbVisitsBySmallCave[node] = nbVisitsBySmallCave[node] - 1;
    }
    function getNeighbors(node: string) {
        const neighbors: string[] = [];
        edges.forEach((edge) => {
            if (edge.node1 === node && canVisit(edge.node2)) { neighbors.push(edge.node2); }
            if (edge.node2 === node && canVisit(edge.node1)) { neighbors.push(edge.node1); }
        });
        return neighbors;
    }
    function canVisit(node: string) {
        if (node === "start") { return false; }
        if (isLargeCave(node)) { return true; }
        if (! nbVisitsBySmallCave[node]) { return true; }
        return Object.values(nbVisitsBySmallCave).every(nbVisit => nbVisit < smallCaveVisitsLimit);
    }
}

function isLargeCave(node: string) {
    return node.toUpperCase() === node;
}
