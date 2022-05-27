import { Color } from './global/enums';
import { Settings } from './global/settings';

import { Cell } from './cell';

import * as LETTER_SCORES from '../data/letter-scores.data';

export class ScoreCalculator {

    public static calculateScore(cells: Cell[][]): number {
        let score = 0;
        for (let i = 0; i < cells.length; i++) {
            score += this.calculateSingleWordsScore(cells[i]);
        }
        return score;
    }

    public static calculateSingleWordsScore(cells: Cell[]): number {
        let arrayResult = [];
        let score = 0;
        let multiplier = 1;
        for (let i = 0; i < cells.length; i++) {
            arrayResult[i] = LETTER_SCORES[cells[i].getLetter()];
        }
        multiplier = this.applyMultiplier(cells, arrayResult);
        arrayResult.forEach((val) => {
            score += val;
        });
        score *= multiplier;
        let bingoCounter = 0;
        cells.forEach((cell) => {
            if (!cell.getIsMergedWithGrid()) {
                bingoCounter++;
            }
        });
        if (bingoCounter === Settings.SUPPORT_CAPACITY) { // place all letters -> bingo
            const BINGO_POINTS = 50;
            score += BINGO_POINTS;
        }
        return score;
    }

    private static applyMultiplier(cells: Cell[], score: number[]): number {
        let wordMultiplier = 1;
        for (let i = 0; i < score.length; i++) {
            if (!cells[i].getIsMergedWithGrid()) {
                switch (cells[i].getColor()) {
                    case Color.DARK_BLUE:
                        score[i] *= 3;
                        break;
                    case Color.BLUE:
                        score[i] *= 2;
                        break;
                    case Color.RED:
                        wordMultiplier *= 3;
                        break;
                    case Color.PINK:
                        wordMultiplier *= 2;
                }
            }
        }
        return wordMultiplier;
    }

}
