import { loadInput, splitLines, toInt } from "../utils";

export function day21() {
    const input = loadInput("day21");
    const [pos1, pos2] = parseInput(input);

    return {
        part1: () => part1(pos1, pos2),
        part2: () => part2(pos1, pos2)
    };
}

enum PLAYERS { ONE, TWO}

export function parseInput(input: any) {
    return splitLines(input).map(x => x.split(": ")[1]).map(toInt);
}

export function part1(pos1: number, pos2: number) {
    const game = new Game(pos1, pos2);

    while (! game.isOver()) {
        game.moveNextPlayer();
    }

    return game.getEndScore();
}

class Game {
    pos1: number;
    pos2: number;
    score1: number;
    score2: number;
    diceResult: number;
    nbDiceRolls: number;
    nextPlayer: PLAYERS;

    constructor(pos1: number, pos2: number) {
        this.pos1 = pos1;
        this.pos2 = pos2;
        this.score1 = 0;
        this.score2 = 0;
        this.diceResult = 0;
        this.nbDiceRolls = 0;
        this.nextPlayer = PLAYERS.ONE;
    }

    isOver() {
        return Math.max(this.score1, this.score2) >= 1000;
    }

    getLoserScore() {
        return Math.min(this.score1, this.score2);
    }

    getEndScore() {
        return this.getLoserScore() * this.nbDiceRolls;
    }

    moveNextPlayer() {
        let move = 0;
        for (let i = 0; i < 3; i++) {
            this.diceResult = this.diceResult % 100 + 1;
            move += this.diceResult;
            this.nbDiceRolls++;
        }

        if (this.nextPlayer === PLAYERS.ONE) {
            this.pos1 = (this.pos1 + move - 1) % 10 + 1;
            this.score1 += this.pos1;
            this.nextPlayer = PLAYERS.TWO;
        } else {
            this.pos2 = (this.pos2 + move - 1) % 10 + 1;
            this.score2 += this.pos2;
            this.nextPlayer = PLAYERS.ONE;
        }
    }
}

export function part2(pos1: number, pos2: number) {
    const cache: Record<string, [number, number]> = {};
    const nbWins = countNbWins(0, [pos1, pos2], [0, 0]);
    return Math.max(...nbWins);

    function countNbWins(player: PLAYERS, positions: [number, number], scores: [number, number]) {
        const key = JSON.stringify([player, positions, scores])

        if (cache[key]) { return cache[key]; }
        if (scores[0] >= 21) { return [1, 0]; }
        if (scores[1] >= 21) { return [0, 1]; }

        cache[key] = computeNbWins();
        return cache[key];

        function computeNbWins() {
            const nbWins: [number, number] = [0, 0];

            for (let diceResult1 = 1; diceResult1 <= 3; diceResult1++) {
                for (let diceResult2 = 1; diceResult2 <= 3; diceResult2++) {
                    for (let diceResult3 = 1; diceResult3 <= 3; diceResult3++) {
                        const diceResult = diceResult1 + diceResult2 + diceResult3;
                        const [nbWins0, nbWins1] = computeNbWinsForResult(diceResult);
                        nbWins[0] += nbWins0;
                        nbWins[1] += nbWins1;
                    }
                }
            }

            return nbWins;
        }
        function computeNbWinsForResult(diceResult: number) {
            if (player === PLAYERS.ONE) {
                const { newPosition, newScore } = movePlayer(positions[0], scores[0], diceResult);
                return countNbWins(PLAYERS.TWO, [newPosition, positions[1]], [newScore, scores[1]]);
            } else {
                const { newPosition, newScore } = movePlayer(positions[1], scores[1], diceResult);
                return countNbWins(PLAYERS.ONE, [positions[0], newPosition], [scores[0], newScore]);
            }
        }
    }
    function movePlayer(position: number, score: number, diceResult: number) {
        const newPosition = (position + diceResult - 1) % 10 + 1;
        const newScore = score + newPosition;
        return { newPosition, newScore };
    }
}
