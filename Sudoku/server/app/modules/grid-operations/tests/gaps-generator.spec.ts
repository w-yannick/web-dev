import { expect } from 'chai';
import * as gapsGenerator from '../gaps-generator';

describe('GapsGenerator', () => {

    it('should empty the right amount of cells', done => {

        let testingGrid = [
            [9, 2, 7, 4, 5, 6, 1, 3, 8],
            [3, 5, 8, 1, 7, 2, 6, 9, 4],
            [1, 6, 4, 3, 9, 8, 7, 2, 5],
            [4, 1, 3, 5, 2, 7, 8, 6, 9],
            [8, 7, 2, 9, 6, 1, 4, 5, 3],
            [5, 9, 6, 8, 4, 3, 2, 7, 1],
            [2, 3, 5, 7, 8, 4, 9, 1, 6],
            [6, 4, 1, 2, 3, 9, 5, 8, 7],
            [7, 8, 9, 6, 1, 5, 3, 4, 2]
        ];

        const CELLS_TO_DELETE = 13;
        gapsGenerator.deleteDigits(testingGrid, CELLS_TO_DELETE);
        let numberOfNulls = 0;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                numberOfNulls += Number(testingGrid[i][j] === undefined);
            }
        }

        expect(numberOfNulls).to.equal(CELLS_TO_DELETE);

        done();
    });

});
