import { expect } from 'chai';
import { Cell } from '../cell';
import { Grid } from '../grid';
import { ScoreCalculator } from '../score-calculator';

let cells1: Cell[];
let cells2: Cell[];
let cells4: Cell[];
let grid: Grid;

describe('Score counter', () => {

    beforeEach(() => {
        grid = new Grid();
        cells1 = [
            new Cell(1, 0, 'P'), new Cell(1, 1, 'A'), new Cell(1, 2, 'T'), new Cell(1, 3, 'E')
        ];

        cells2 = [
            new Cell(0, 0, 'A'), new Cell(0, 1, 'B'), new Cell(0, 2, 'C'), new Cell(0, 3, 'F')
        ];
    });

    it('calculate the score of multiple words', done => {
        let score = ScoreCalculator.calculateScore([cells1, cells2]);
        expect(score).to.equal(57);
        done();
    });

    it('calculate the score of a word', done => {
        let score = ScoreCalculator.calculateSingleWordsScore(cells1);
        expect(score).to.equal(12);
        score = ScoreCalculator.calculateSingleWordsScore(cells2);
        expect(score).to.equal(45);
        done();
    });

    it('should calculate the score of a word while ignoring mutliplier on already added cells', done => {
        let cell1 = new Cell(0, 0, 'A');
        let cells3 = [
            cell1, new Cell(1, 0, 'B'), new Cell(3, 0, 'C')
        ];
        grid.updateCells([cell1]);
        expect(ScoreCalculator.calculateSingleWordsScore(cells3)).to.equal(10);
        done();
    });

    beforeEach(() => {
        cells4 = [
            new Cell(0, 0, 'A'), new Cell(0, 1, 'B'), new Cell(0, 2, 'C'),
            new Cell(0, 3, 'F'), new Cell(0, 4, 'A'), new Cell(0, 5, 'B'), new Cell(0, 6, 'C')
        ];
    });

    it('should trigger a bingo', done => {
        let score = ScoreCalculator.calculateSingleWordsScore(cells4);

        expect(score).to.equal(116);

        done();
    });

    it('should not trigger a bingo', done => {
        let mergedCell = cells4.splice(0, 1);
        grid.updateCells(mergedCell);
        cells4.splice(0, 0, mergedCell[0]);

        let score = ScoreCalculator.calculateSingleWordsScore(cells4);
        expect(score).to.equal(22);

        done();
    });

});
