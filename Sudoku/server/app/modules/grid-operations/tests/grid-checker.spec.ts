import { expect } from 'chai';
import * as gridOperations from '../grid-operations';
import * as gridChecker from '../grid-checker';

describe('GridChecker', () => {

    const testingGrid = [
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

    it('should tell when a grid is valid', done => {
        let grid = gridOperations.cloneGrid(testingGrid);
        expect(gridChecker.isValid(grid)).to.equal(true);

        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(9);
        }

        expect(gridChecker.isValid(grid)).to.equal(true);

        grid[0][0] = 1;
        expect(gridChecker.isValid(grid)).to.equal(true);

        done();
    });

    it('should tell when a grid is invalid', done => {
        let grid = new Array(9);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(9);
        }

        grid[0][0] = 1;
        grid[0][6] = 1;
        expect(gridChecker.isValid(grid)).to.equal(false);

        grid[0][6] = undefined;
        grid[6][0] = 1;
        expect(gridChecker.isValid(grid)).to.equal(false);

        grid[6][0] = undefined;
        grid[2][2] = 1;
        expect(gridChecker.isValid(grid)).to.equal(false);

        done();
    });

    it('should find the right coordinates for the first gap', done => {
        let grid = gridOperations.cloneGrid(testingGrid);
        expect(gridChecker.findFirstGapCoordinates(grid)).to.equal(undefined);

        grid[5][3] = undefined;
        grid[6][2] = undefined;
        let coordinates = gridChecker.findFirstGapCoordinates(grid);
        expect(coordinates.i).to.equal(5);
        expect(coordinates.j).to.equal(3);
        done();
    });

    it('a completed grid should have only one solution', done => {
        let grid = gridOperations.cloneGrid(testingGrid);
        expect(gridChecker.onlyOneSolution(grid)).to.equal(true);
        expect(gridChecker.onlyOneSolution(testingGrid)).to.equal(true);
        done();
    });

    it('a nearly completed grid should have only one solution', done => {
        let grid = gridOperations.cloneGrid(testingGrid);
        grid[5][3] = undefined;
        grid[0][0] = undefined;
        grid[5][1] = undefined;
        grid[4][3] = undefined;
        grid[2][3] = undefined;
        grid[5][8] = undefined;
        expect(gridChecker.onlyOneSolution(grid)).to.equal(true);
        done();
    });

    it('an empty grid should have more or less than one solution', done => {
        let grid = new Array(9);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(9);
        }
        expect(gridChecker.onlyOneSolution(grid)).to.equal(false);
        done();
    });

    it('a nearly empty grid should have more or less than one solution', done => {
        let grid = new Array(9);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(9);
        }
        grid[5][3] = 8;
        grid[0][0] = 9;
        grid[5][1] = 9;
        grid[4][3] = 9;
        grid[2][3] = 3;
        grid[5][8] = 1;
        expect(gridChecker.onlyOneSolution(grid)).to.equal(false);
        done();
    });

});
