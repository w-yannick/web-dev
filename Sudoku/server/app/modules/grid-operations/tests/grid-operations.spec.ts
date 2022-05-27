import * as gridOperations from '../grid-operations';
import { expect } from 'chai';

describe('Grid generation tests', () => {

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

    it('should create a deep copy', done => {
        let test: number[][] = gridOperations.cloneGrid(testingGrid);

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                expect(test[i][j]).to.equal(testingGrid[i][j]);
            }
        }
        test[0][0] = 0;

        expect(test[0][0]).to.not.equal(testingGrid[0][0]);
        done();
    });

    it('should permute two colums', done => {
        let permutedGrid = gridOperations.cloneGrid(testingGrid);
        gridOperations.swapTwoColumns(permutedGrid, 1, 2);

        for (let i = 0; i < permutedGrid.length; i++) {
            expect(permutedGrid[i][1]).to.equal(testingGrid[i][2]);
        }

        done();
    });

    it('should permute two rows', done => {
        let permutedGrid = gridOperations.cloneGrid(testingGrid);
        gridOperations.swapTwoRows(permutedGrid, 1, 2);

        for (let i = 0; i < permutedGrid.length; i++) {
            expect(permutedGrid[1][i]).to.equal(testingGrid[2][i]);
        }

        done();
    });

    it('should symetrically permute all columns', done => {
        let permutedGrid = gridOperations.cloneGrid(testingGrid);
        gridOperations.reverseColumns(permutedGrid);

        for (let i = 0; i < (testingGrid.length + 1) / 2; i++) {
            expect(permutedGrid[0][i]).to.equal(testingGrid[0][testingGrid.length - 1 - i]);
        }

        done();
    });

    it('should symetrically permute all rows', done => {
        let permutedGrid = gridOperations.cloneGrid(testingGrid);
        gridOperations.reverseRows(permutedGrid);

        for (let i = 0; i < (permutedGrid.length + 1) / 2; i++) {
            expect(permutedGrid[i][1]).to.equal(testingGrid[((permutedGrid.length - 1 - i))][1]);
        }

        done();
    });

    it('should transpose the array', done => {
        let permutedGrid = gridOperations.cloneGrid(testingGrid);
        gridOperations.reverseDiagonally(permutedGrid);

        for (let i = 0; i < permutedGrid.length; i++) {
            for (let j = 0; j < permutedGrid.length; j++) {
                expect(permutedGrid[i][j]).to.equal(testingGrid[j][i]);
            }
        }

        done();
    });

});
