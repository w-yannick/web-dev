import { expect } from 'chai';
import { Cell } from '../../cell';
import { Grid } from '../../grid';
import { Orientation } from '../../global/enums';
import { CellsOperations } from '../../cells-operations';
import { HorizontalGridOperations } from '../horizontal-grid-operations';


let grid: Grid;
let gridOperations: HorizontalGridOperations;

describe('Horizontal operations ', () => {
    beforeEach(() => {
        grid = new Grid();
        gridOperations = new HorizontalGridOperations(grid);
    });

    it('should read the word horizontaly', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(0, 0, ['p', 'd', 'f'], Orientation.HORIZONTAL);
        let wordsAlreadyOnGrid2 = CellsOperations.convertWordToCells(0, 4, ['p', 'd', 'f'], Orientation.HORIZONTAL);
        grid.updateCells(wordsAlreadyOnGrid1);
        grid.updateCells(wordsAlreadyOnGrid2);
        let readWord = gridOperations.readWord(new Cell(0, 3, 'e'));
        let expectedResult = ['p', 'd', 'f', 'e', 'p', 'd', 'f'];
        expect(readWord.length).to.equal(expectedResult.length);
        for (let i = 0; i < readWord.length; i++) {
            expect(readWord[i].getLetter()).to.equal(expectedResult[i]);
        }
        done();
    });

    it('should check if there are letters on the word\'s edges', done => {
        let horizontalWord = [new Cell(1, 2, 'c'), new Cell(1, 3, 'd')];
        let wordsAlreadyOnGrid = [new Cell(1, 0, 'a'), new Cell(1, 1, 'b'), new Cell(1, 4, 'e')];

        expect(gridOperations.checkLettersAtEdges(horizontalWord)).to.equal(false);
        grid.updateCells(wordsAlreadyOnGrid);

        expect(gridOperations.checkLettersAtEdges(horizontalWord)).to.equal(true);

        done();
    });

});
