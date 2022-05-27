import { Cell } from '../cell';
import { Orientation } from '../global/enums';
import { CellsOperations } from '../cells-operations';
import { Grid } from '../grid';
import { WordChecker } from '../word-checker';
import { ScoreCalculator } from '../score-calculator';
import { GridOperations } from './grid-operations';
import { HorizontalGridOperations } from './horizontal-grid-operations';
import { VerticalGridOperations } from './vertical-grid-operations';
import { ExtractCellsOperations } from './extract-cells-operations';

export class PlaceWordOperation extends GridOperations {

    constructor(grid: Grid) {
        super(grid);
    }

    public placeWordOnGrid(cells: Cell[], orientation: Orientation): number {
        let score = -1;
        let wordToInsert = CellsOperations.cellsToLetters(cells).join("");
        if (this.grid.gridCenterIsEmpty()) {
            if (this.doesWordTouchOrigin(cells) && WordChecker.checkWord(wordToInsert)) {
                score = ScoreCalculator.calculateSingleWordsScore(cells);
                this.grid.updateCells(cells);
            }
        } else {
            if (this.checkAlreadyAddedCells(cells)) {
                let cellsExtractor = new ExtractCellsOperations(this.grid);
                let allCreatedWordsCells = this.getAllCreatedWords(cellsExtractor.extractNewCells(cells), orientation);
                let words = CellsOperations.convertCreatedWordsToArray(allCreatedWordsCells);

                words.push(CellsOperations.cellsToLetters(cells).join(""));
                if (WordChecker.checkWords(words) && this.getAllCreatedWords(cells, orientation).length >= 2) {
                    allCreatedWordsCells.push(cells);
                    score = ScoreCalculator.calculateScore(allCreatedWordsCells);
                    this.grid.updateCells(cells);
                }
            }
        }
        return score;
    }

    public getAllCreatedWords(cells: Cell[], orientation: Orientation): Cell[][] {
        let newWordsCells: Cell[][] = [[]];
        if (orientation === Orientation.VERTICAL) {
            let horizontalGridOperations = new HorizontalGridOperations(this.grid);
            newWordsCells = horizontalGridOperations.getAllCreatedWords(cells);
        }
        else {
            let verticalWordReader = new VerticalGridOperations(this.grid);
            newWordsCells = verticalWordReader.getAllCreatedWords(cells);
        }
        return newWordsCells;
    }

    public getGrid(): Grid {
        return this.grid;
    }

    public doesWordTouchOrigin(cells: Cell[]): boolean {
        let index = cells.findIndex((cell) => {
            if (cell.getRow() === 7 && cell.getColumn() === 7) {
                return true;
            }
        });
        return index !== -1;
    }

    public checkAlreadyAddedCells(cells: Cell[]): boolean {
        let cellsMatch = true;
        let cellsExtractor = new ExtractCellsOperations(this.grid);
        cellsExtractor.extractAlreadyAddedCells(cells).forEach((cell) => {
            if (cell.getLetter() !== this.grid.getCell(cell.getRow(), cell.getColumn()).getLetter()) {
                cellsMatch = false;
            }
        });
        return cellsMatch;
    }

    public checkLettersAtEdges(cells: Cell[], orientation: Orientation): boolean {
        if (orientation === Orientation.HORIZONTAL) {
            let horizontalGridOperations = new HorizontalGridOperations(this.grid);
            return horizontalGridOperations.checkLettersAtEdges(cells);
        } else {
            let verticalGridOperations = new VerticalGridOperations(this.grid);
            return verticalGridOperations.checkLettersAtEdges(cells);
        }
    }
}
