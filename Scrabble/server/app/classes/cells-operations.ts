import { Cell } from './cell';
import { Orientation } from './global/enums';

export class CellsOperations {

    public static reverseCells(cells: Cell[]) {
        let tempCell: Cell;
        for (let i = 0; i < cells.length / 2; i++) {
            tempCell = cells[i];
            cells[i] = cells[cells.length - i - 1];
            cells[cells.length - i - 1] = tempCell;
        }

    }
    public static convertCreatedWordsToArray(allCreatedWordsCells: Cell[][]): Array<string> {
        let words = new Array<string>();
        for (let i = 0; i < allCreatedWordsCells.length; i++) {
            if (allCreatedWordsCells[i].length !== 0) {
                words.push(CellsOperations.cellsToLetters(allCreatedWordsCells[i]).join(""));
            }
        }
        return words;
    }

    public static cellsToLetters(cells: Cell[]): string[] {
        let letters = new Array<string>();

        cells.forEach((cell) => {
            letters.push(cell.getLetter());
        });
        return letters;
    }

    public static convertWordToCells(row: number, column: number, word: string[], orientation: Orientation): Cell[] {
        let cells: Cell[] = [];
        if (orientation === Orientation.VERTICAL) {
            word.forEach((letter) => {
                cells.push(new Cell(row++, column, letter));
            });
        }
        else {
            word.forEach((letter) => {
                cells.push(new Cell(row, column++, letter));
            });
        }
        return cells;
    }

}
