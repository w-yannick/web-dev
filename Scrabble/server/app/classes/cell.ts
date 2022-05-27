import { Color } from './global/enums';
import * as ColoredCells from '../data/colored-cells.data';

export class Cell {

    private row: number;
    private column: number;
    private color: Color;
    private letter: string;
    // A cell is merged with the grid after the turn it was successully added
    private isMergedWithGrid: boolean;

    constructor(row: number, column: number, letter: string) {
        this.row = row;
        this.column = column;
        this.letter = letter;
        this.isMergedWithGrid = false;

        this.chooseColor();
    }

    private chooseColor(): void {
        if (this.areCoordinatesContainedInList(ColoredCells.yellowCells)) {
            this.color = Color.YELLOW;
        } else if (this.areCoordinatesContainedInList(ColoredCells.darkBlueCells)) {
            this.color = Color.DARK_BLUE;
        } else if (this.areCoordinatesContainedInList(ColoredCells.blueCells)) {
            this.color = Color.BLUE;
        } else if (this.areCoordinatesContainedInList(ColoredCells.redCells)) {
            this.color = Color.RED;
        } else if (this.areCoordinatesContainedInList(ColoredCells.pinkCells)) {
            this.color = Color.PINK;
        } else {
            this.color = Color.GREEN;
        }
    }

    private areCoordinatesContainedInList(list: number[][]): boolean {
        let index = list.findIndex((coordinates) => {
            let sameRow = coordinates[0] === this.row + 1;
            let sameColumn = coordinates[1] === this.column + 1;
            return sameRow && sameColumn;
        });

       return index !== -1;
    }

    public setRow(row: number): void {
        this.row = row;
    }

    public setColumn(column: number): void {
        this.column = column;
    }

    public setLetter(letter: string): void {
        this.letter = letter;
    }

    public getColumn(): number {
        return this.column;
    }

    public getRow(): number {
        return this.row;
    }

    public getLetter(): string {
        return this.letter;
    }

    public getColor(): Color {
        return this.color;
    }

    public getIsMergedWithGrid(): boolean {
        return this.isMergedWithGrid;
    }

    public mergeWithGrid(): void {
        this.isMergedWithGrid = true;
    }

}
