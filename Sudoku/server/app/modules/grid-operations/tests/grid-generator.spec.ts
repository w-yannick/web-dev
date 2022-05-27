import * as gridGenerator from '../grid-generator';
import { expect } from 'chai';

describe('Difficulty tests', () => {

    let easyGrid: any = gridGenerator.easyModeGrid();

    it('easy mode should delete 35 cells', done => {
        const CELLS_TO_DELETE = 35;
        let numberOfNulls = 0;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                numberOfNulls += Number(easyGrid['gappedGrid'][i][j] === undefined);
            }
        }
        expect(numberOfNulls).to.equal(CELLS_TO_DELETE);
        done();
    });

    let hardGrid = gridGenerator.hardModeGrid();

    it('hard mode should delete 48 cells', done => {
        const CELLS_TO_DELETE = 48;
        let numberOfNulls = 0;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                numberOfNulls += Number(hardGrid['gappedGrid'][i][j] === undefined);
            }
        }

        expect(numberOfNulls).to.equal(CELLS_TO_DELETE);
        done();
    });
});
