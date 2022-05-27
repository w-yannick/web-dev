import { expect } from 'chai';
import { Grid } from '../grid';
import { Cell } from '../cell';

describe('Grid tests', () => {
    let grid: Grid;
    let cells: Cell[];

    beforeEach(() => {
        grid = new Grid();
        cells = [
            new Cell(0, 0, 'A'), new Cell(0, 5, 'B'), new Cell(14, 14, 'C')
        ];
    });

    it('should update the grid', done => {
        grid.updateCells(cells);

        expect(grid.getCell(0, 0).getLetter()).to.equal('A');
        expect(grid.getCell(0, 5).getLetter()).to.equal('B');
        expect(grid.getCell(14, 14).getLetter()).to.equal('C');

        done();
    });

    it('should get a cell in the grid', done => {
        grid.updateCells(cells);

        expect(grid.getCell(0, 0)).to.equal(cells[0]);
        expect(grid.getCell(0, 5)).to.equal(cells[1]);
        expect(grid.getCell(14, 14)).to.equal(cells[2]);

        done();
    });

    it('should test if the first turn has been player', done => {
        expect(grid.gridCenterIsEmpty()).to.equal(true);

        grid.updateCells([new Cell(7, 7, 'R')]);

        expect(grid.gridCenterIsEmpty()).to.equal(false);

        done();
    });

});
