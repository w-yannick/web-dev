import { expect } from 'chai';
import { Cell } from '../../cell';
import { Grid } from '../../grid';
import { ExtractCellsOperations } from '../extract-cells-operations';
import { PlaceWordOperation } from '../place-word-operation';
import { CellsOperations } from '../../cells-operations';
import { Orientation } from '../../global/enums';

let grid: Grid;
let cellsExtractor: ExtractCellsOperations;
let placeWordOperation: PlaceWordOperation;

describe('Horizontal operations ', () => {
    beforeEach(() => {
        grid = new Grid();
        cellsExtractor = new ExtractCellsOperations(grid);
        placeWordOperation = new PlaceWordOperation(grid);
    });

    it('should extract new cells', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);
        wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 8, ['N', 'O', 'N'], Orientation.VERTICAL);
        let cells = cellsExtractor.extractNewCells(
            CellsOperations.convertWordToCells(7, 8, ['N', 'O', 'N'], Orientation.VERTICAL)
        );
        let result: Cell[] = [];
        for (let i = 1; i < 3; i++) {
            result.push(wordsAlreadyOnGrid1[i]);
        }
        expect(cells).to.eql(result);
        done();
    });

    it('should extract cells that are already on the grid', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);
        wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 8, ['N', 'O', 'N'], Orientation.VERTICAL);
        let cells = cellsExtractor.extractAlreadyAddedCells(
            CellsOperations.convertWordToCells(7, 8, ['N', 'O', 'N'], Orientation.VERTICAL)
        );
        let result: Cell[] = [];
        result.push(wordsAlreadyOnGrid1[0]);
        expect(cells[0].getLetter()).to.equal(result[0].getLetter());
        done();
    });
});
