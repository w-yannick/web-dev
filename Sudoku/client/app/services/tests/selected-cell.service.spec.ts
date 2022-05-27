import { expect } from 'chai';
import { SelectedCellService } from '../selected-cell.service';

describe('Cell selection tests', () => {
    let grid: number[][];
    let selectedCellService: SelectedCellService;

    beforeEach(() => {
        grid = [
            [null, 2, 3],
            [null, null, null],
            [7, null, 9]
        ];
        selectedCellService = new SelectedCellService(grid);
        selectedCellService.setSelection(1, 1);
    });

    it('should return an object with the selection coordinates', done => {
        expect(selectedCellService.getSelection()['row']).to.not.be.undefined;
        expect(selectedCellService.getSelection()['row']).to.equal(1);

        expect(selectedCellService.getSelection()['column']).to.not.be.undefined;
        expect(selectedCellService.getSelection()['row']).to.equal(1);

        done();
    });

    it('should set the selection coordinates', done => {
        selectedCellService.setSelection(4, 5);
        expect(selectedCellService.getSelection()['row']).to.equal(4);
        expect(selectedCellService.getSelection()['column']).to.equal(5);

        done();
    });

    it('should move the selection up', done => {
        selectedCellService.moveUp();
        expect(selectedCellService.getSelection()['row']).to.equal(2);
        selectedCellService.moveUp();
        expect(selectedCellService.getSelection()['row']).to.equal(1);
        done();
    });

    it('should move the selection down', done => {
        selectedCellService.moveDown();
        expect(selectedCellService.getSelection()['row']).to.equal(2);
        selectedCellService.moveDown();
        expect(selectedCellService.getSelection()['row']).to.equal(1);
        done();
    });

    it('should move the selection left', done => {
        selectedCellService.moveLeft();
        expect(selectedCellService.getSelection()['column']).to.equal(0);
        selectedCellService.moveLeft();
        expect(selectedCellService.getSelection()['column']).to.equal(2);
        done();
    });

    it('should move the selection right', done => {
        selectedCellService.moveRight();
        expect(selectedCellService.getSelection()['column']).to.equal(2);
        selectedCellService.moveRight();
        expect(selectedCellService.getSelection()['column']).to.equal(0);
        done();
    });

});
