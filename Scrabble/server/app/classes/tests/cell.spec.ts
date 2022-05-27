import { expect } from 'chai';

import { Cell } from '../cell';
import { Color } from '../global/enums';

describe('Cell class', () => {

    it('Cell constructor should save the coordinates', () => {
        let cell: Cell;
        cell = new Cell(1, 3, undefined);
        expect(cell.getRow()).to.equal(1);
        expect(cell.getColumn()).to.equal(3);
        cell = new Cell(99, 98, undefined);
        expect(cell.getRow()).to.equal(99);
        expect(cell.getColumn()).to.equal(98);
        cell = new Cell(0, 0, undefined);
        expect(cell.getRow()).to.equal(0);
        expect(cell.getColumn()).to.equal(0);
    });

    it('Cell constructor should tell the color correctly', () => {
        let cell: Cell;
        cell = new Cell(7, 7, undefined);
        expect(cell.getColor()).to.equal(Color.YELLOW);
        cell = new Cell(7, 0, undefined);
        expect(cell.getColor()).to.equal(Color.RED);
        cell = new Cell(14, 2, undefined);
        expect(cell.getColor()).to.equal(Color.GREEN);
    });

});
