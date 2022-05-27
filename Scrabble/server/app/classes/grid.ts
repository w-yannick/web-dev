import { Cell } from './cell';

export class Grid {

    private cells: Cell[][];

    constructor() {
        this.cells = [];
        for (let i = 0; i < 15; i++) {
            this.cells[i] = [];
            for (let j = 0; j < 15; j++) {
                this.cells[i][j] = new Cell(i, j, undefined);
            }
        }
    }

    public getAllCells(): Cell[][] {
        return this.cells;
    }

    public updateCells(cells: Cell[]) {
        cells.forEach((cell) => {
            this.cells[cell.getRow()][cell.getColumn()] = cell;
            cell.mergeWithGrid();
        });
    }


    public getCell(row: number, column: number): Cell {
        if (row >= 0 && row < 15
            && column >= 0 && column < 15) {
            return this.cells[row][column];
        } else {
            return undefined;
        }
    }


    // Check if first turn has already been played
    public gridCenterIsEmpty(): boolean {
        return this.getCell(7, 7).getLetter() === undefined;
    }

}
