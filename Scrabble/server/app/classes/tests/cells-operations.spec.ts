import { expect } from 'chai';
import { Cell } from '../cell';
import { CellsOperations } from '../cells-operations';
import { Orientation } from '../global/enums';

describe('cells operations test', () => {

    it('should create an array of cells from a string', done => {
        let word = ['w', 'o', 'r', 'd'];
        let expectPositions = [[1, 1], [2, 1], [3, 1], [4, 1]];
        let result = CellsOperations.convertWordToCells(1, 1, word, Orientation.VERTICAL);

        for (let i = 0; i < word.length; i++) {
            expect(result[i].getLetter()).to.equal(word[i]);
            expect(result[i].getRow()).to.equal(expectPositions[i][0]);
            expect(result[i].getColumn()).to.equal(expectPositions[i][1]);
        }

        done();
    });

    it('should reverse an array of cells', done => {
        let cells = CellsOperations.convertWordToCells(1, 1, ['w', 'o', 'r', 'd'], Orientation.HORIZONTAL);
        CellsOperations.reverseCells(cells);
        let expectedResult = ['d', 'r', 'o', 'w'];

        for (let i = 0; i < cells.length; i++) {
            expect(cells[i].getLetter()).to.equal(expectedResult[i]);
        }

        done();
    });

    it('should convert cells to a string', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['N', 'O', 'N'], Orientation.HORIZONTAL);
        let word = CellsOperations.cellsToLetters(wordsAlreadyOnGrid1);
        let result = ['N', 'O', 'N'];

        expect(word).to.eql(result);

        done();
    });

    let cellsArray: Cell[][];

    before(() => {
        cellsArray = [
            CellsOperations.convertWordToCells(7, 7, ['N', 'O', 'N'], Orientation.HORIZONTAL),
            CellsOperations.convertWordToCells(8, 7, ['O', 'U', 'I'], Orientation.HORIZONTAL),
            CellsOperations.convertWordToCells(7, 7, ['C', 'A', 'R'], Orientation.HORIZONTAL)
        ];
    });

    it('should convert an array of words to arrays of string', done => {
        let expectedResult = [
            'NON',
            'OUI',
            'CAR'
        ];
        let result = CellsOperations.convertCreatedWordsToArray(cellsArray);

        expect(result).to.eql(expectedResult);

        done();
    });
});
