import { expect } from 'chai';
import { Cell } from '../../cell';
import { Grid } from '../../grid';
import { Orientation } from '../../global/enums';
import { CellsOperations } from '../../cells-operations';
import { VerticalGridOperations } from '../vertical-grid-operations';


let grid: Grid;
let gridOperations: VerticalGridOperations;

describe('Vertical operations ', () => {

    beforeEach(() => {
        grid = new Grid();
        gridOperations = new VerticalGridOperations(grid);
    });

    it('should read the word verticaly', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(0, 0, ['p', 'd', 'f'], Orientation.VERTICAL);
        let wordsAlreadyOnGrid2 = CellsOperations.convertWordToCells(4, 0, ['p', 'd', 'f'], Orientation.VERTICAL);

        grid.updateCells(wordsAlreadyOnGrid1);
        grid.updateCells(wordsAlreadyOnGrid2);

        let readWord = gridOperations.readWord(new Cell(3, 0, 'e'));
        let expectedResult = ['p', 'd', 'f', 'e', 'p', 'd', 'f'];

        expect(readWord.length).to.equal(expectedResult.length);

        for (let i = 0; i < readWord.length; i++) {
            expect(readWord[i].getLetter()).to.equal(expectedResult[i]);
        }

        done();
    });

    it('should check if there are letters on the word\'s edges', done => {
        let verticalWord = CellsOperations.convertWordToCells(2, 0, ['b', 'c', 'd'], Orientation.VERTICAL);
        let wordsAlreadyOnGrid = [new Cell(1, 0, 'a'), new Cell(1, 1, 'b'), new Cell(1, 4, 'e')];

        expect(gridOperations.checkLettersAtEdges(verticalWord)).to.equal(false);
        grid.updateCells(wordsAlreadyOnGrid);

        expect(gridOperations.checkLettersAtEdges(verticalWord)).to.equal(true);

        done();
    });


});
