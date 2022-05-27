import { GridChecker } from '../grid-checker';
import { expect } from 'chai';
describe('Grid checker test', () => {

    let inputGrid: number[][];
    let gridChecker: GridChecker;

    before(() => {
        inputGrid = [
            [1, 2, 3],
            [4, null, 6]
        ];
        gridChecker = new GridChecker();
    });

    it('should check if there is any gap in the grid', done => {
        let result = gridChecker.checkCompletion(inputGrid);

        expect(result).to.equal(false);

        inputGrid[1][1] = 5;
        result = gridChecker.checkCompletion(inputGrid);

        expect(result).to.equal(true);

        done();
    });


    describe('Entry validation tests', () => {

        beforeEach(() => {
            inputGrid = [[]];
            inputGrid[0] = new Array<number>(9);
            for (let i = 0; i < 8; i++) {
                inputGrid.push(new Array<number>(9));
            }
            gridChecker = new GridChecker();

        });

        it('should not allow adding 2 identical number in the same row', done => {
            inputGrid[0][0] = 1;


            expect(gridChecker.checkValidity(inputGrid)).to.equal(false);

            done();
        });

        it('should not allow adding 2 identical number in the same column', done => {
            inputGrid[0][0] = 1;
            inputGrid[6][0] = 1;
            expect(gridChecker.checkValidity(inputGrid)).to.equal(false);

            done();
        });

        it('should not allow adding 2 identical number in the same square', done => {
            inputGrid[0][0] = 1;
            inputGrid[1][1] = 1;

            expect(gridChecker.checkValidity(inputGrid)).to.equal(false);

            inputGrid[3][3] = 1;
            inputGrid[6][6] = 1;

            expect(gridChecker.checkValidity(inputGrid)).to.equal(false);

            done();
        });
    });

});
