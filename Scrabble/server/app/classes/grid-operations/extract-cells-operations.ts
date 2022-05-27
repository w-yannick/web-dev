import { GridOperations } from './grid-operations';
import { Cell } from '../cell';
import { Grid } from '../grid';

export class ExtractCellsOperations extends GridOperations {

    constructor(grid: Grid) {
        super(grid);
    }

    public extractNewCells(cells: Cell[]): Cell[] {
        let extractedCells = new Array<Cell>();

        cells.forEach((cell) => {
            if (this.grid.getCell(cell.getRow(), cell.getColumn()).getLetter() === undefined) {
                extractedCells.push(cell);
            }
        });
        return extractedCells;
    }

    public extractAlreadyAddedCells(cells: Cell[]): Cell[] {
        let extractedCells = new Array<Cell>();

        cells.forEach((cell) => {
            if (this.grid.getCell(cell.getRow(), cell.getColumn()).getLetter() !== undefined) {
                extractedCells.push(cell);
            }
        });
        return extractedCells;
    }
}
