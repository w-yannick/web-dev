import { GridOperations } from './grid-operations';
import { Cell } from '../cell';
import { CellsOperations } from '../cells-operations';
import { Grid } from '../grid';

export class HorizontalGridOperations extends GridOperations {

    constructor(grid: Grid) {
        super(grid);
    }

    public readWord(cell: Cell): Cell[] {
        let previousCells = new Array<Cell>();
        let nextCells = new Array<Cell>();
        let atLeastOne = false;
        let i = 1;
        let tempCell = this.grid.getCell(cell.getRow(), cell.getColumn() - i);
        while (tempCell !== undefined && tempCell.getLetter() !== undefined) {
            atLeastOne = true;
            previousCells.push(tempCell);
            tempCell = this.grid.getCell(cell.getRow(), cell.getColumn() - ++i);
        }

        CellsOperations.reverseCells(previousCells);

        i = 1;
        tempCell = this.grid.getCell(cell.getRow(), cell.getColumn() + i);


        while (tempCell !== undefined && tempCell.getLetter() !== undefined) {
            atLeastOne = true;
            nextCells.push(tempCell);
            tempCell = this.grid.getCell(cell.getRow(), cell.getColumn() + ++i);
        }
        if (atLeastOne) {
            return previousCells = previousCells.concat([cell], nextCells);
        } else {
            return [];
        }
    }

    public checkLettersAtEdges(cells: Cell[]): boolean {
        let edgesExist = false;
        let lowerEdge: Cell;
        let upperEdge: Cell;

        lowerEdge = this.grid.getCell(cells[0].getRow(), cells[0].getColumn() - 1);
        upperEdge = this.grid.getCell(cells[cells.length - 1].getRow(), cells[cells.length - 1].getColumn() + 1);

        //Une cellule a gauche du mot etait deja remplie
        if ((lowerEdge !== undefined && lowerEdge.getLetter() !== undefined)
            || upperEdge !== undefined && upperEdge.getLetter() !== undefined) {
            // Une cellule a droite du mot etait deja remplie
            edgesExist = true;
        }

        return edgesExist;
    }

    public getAllCreatedWords(cells: Cell[]): Cell[][] {
        let newWordsCells: Cell[][] = [[]];

        cells.forEach((cell, i) => {
            let tempCells = this.readWord(cell);
            if (tempCells.length > 1) {
                newWordsCells.push(tempCells);
            }
        });

        return newWordsCells;
    }

}
