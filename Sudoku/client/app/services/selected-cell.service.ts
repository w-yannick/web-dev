import { Injectable } from '@angular/core';

@Injectable()
export class SelectedCellService {

    private selectedCellRow: number;
    private selectedCellColumn: number;
    private grid: number[][];

    constructor(grid: number[][]) {
        this.selectedCellColumn = -1;
        this.selectedCellRow = -1;
        this.grid = grid;
    }

    public getSelection(): Object {
        return { row: this.selectedCellRow, column: this.selectedCellColumn };
    }

    public setSelection(row: number, column: number): void {
        this.selectedCellColumn = column;
        this.selectedCellRow = row;
    }

    public moveLeft(): void {
        this.selectedCellColumn--;
        if (this.selectedCellColumn < 0) {
            this.selectedCellColumn = this.grid.length - 1;
        }
        if (this.grid[this.selectedCellRow][this.selectedCellColumn] !== null) {
            this.moveLeft();
        }
    }

    public moveRight(): void {
        this.selectedCellColumn = (this.selectedCellColumn + 1) % this.grid.length;
        if (this.grid[this.selectedCellRow][this.selectedCellColumn] !== null) {
            this.moveRight();
        }
    }

    public moveDown(): void {
        this.selectedCellRow = (this.selectedCellRow + 1) % this.grid.length;
        if (this.grid[this.selectedCellRow][this.selectedCellColumn] !== null) {
            this.moveDown();
        }
    }

    public moveUp(): void {
        this.selectedCellRow = (this.selectedCellRow - 1) % this.grid.length;
        if (this.selectedCellRow < 0) {
            this.selectedCellRow = this.grid.length - 1;
        }
        if (this.grid[this.selectedCellRow][this.selectedCellColumn] !== null) {
            this.moveUp();
        }
    }

    public delete(): void {
        let i = this.selectedCellRow;
        let j = this.selectedCellColumn;
        if (this.grid[i][j] === null) {
            let input = document.getElementById(i + '_' + j) as HTMLInputElement;
            input.value = null;
        }
    }

    public focusSelection(): void {
        let input = document.getElementById(this.selectedCellRow + '_' + this.selectedCellColumn);
        if (input !== null) {
            input.focus();
        }
    }
}
