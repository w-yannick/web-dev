import { expect } from 'chai';
import { Cell } from '../../cell';
import { Grid } from '../../grid';
import { Orientation } from '../../global/enums';
import { CellsOperations } from '../../cells-operations';
import { PlaceWordOperation } from '../place-word-operation';


let grid: Grid;
let placeWordOperation: PlaceWordOperation;

describe('Grid tests: ', () => {

    beforeEach(() => {
        grid = new Grid();
        placeWordOperation = new PlaceWordOperation(grid);
    });

    it('should check if there are letters on the word\'s edges', done => {

        let horizontalWord = [new Cell(1, 2, 'c'), new Cell(1, 3, 'd')];
        let verticalWord = CellsOperations.convertWordToCells(2, 0, ['b', 'c', 'd'], Orientation.VERTICAL);
        let wordsAlreadyOnGrid = [new Cell(1, 0, 'a'), new Cell(1, 1, 'b'), new Cell(1, 4, 'e')];

        expect(placeWordOperation.checkLettersAtEdges(horizontalWord, Orientation.HORIZONTAL)).to.equal(false);
        expect(placeWordOperation.checkLettersAtEdges(verticalWord, Orientation.VERTICAL)).to.equal(false);
        grid.updateCells(wordsAlreadyOnGrid);

        expect(placeWordOperation.checkLettersAtEdges(horizontalWord, Orientation.HORIZONTAL)).to.equal(true);
        expect(placeWordOperation.checkLettersAtEdges(verticalWord, Orientation.VERTICAL)).to.equal(true);

        done();
    });


    it('should find all words created with a new word insertion', done => {

        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(0, 0, ['p', 'd', 'f'], Orientation.HORIZONTAL);
        let wordsAlreadyOnGrid2 = CellsOperations.convertWordToCells(1, 0, ['a', 'i', 'r'], Orientation.HORIZONTAL);
        let newWord = CellsOperations.convertWordToCells(2, 0, ['r', 'p', 'e'], Orientation.HORIZONTAL);
        let wordsAlreadyOnGrid3 = CellsOperations.convertWordToCells(3, 0, ['s', 'e', 't'], Orientation.HORIZONTAL);
        grid.updateCells(wordsAlreadyOnGrid1);
        grid.updateCells(wordsAlreadyOnGrid2);
        grid.updateCells(wordsAlreadyOnGrid3);

        let expectedResult = [
            ['r', 'p', 'e'],
            ['p', 'a', 'r', 's'],
            ['d', 'i', 'p', 'e'],
            ['f', 'r', 'e', 't']
        ];
        let allNewWords = placeWordOperation.getAllCreatedWords(newWord, Orientation.HORIZONTAL);
        for (let i = 0; i < allNewWords.length; i++) {
            for (let j = 0; j < allNewWords[i].length; j++) {
                expect(allNewWords[i][j].getLetter()).to.equal(expectedResult[i][j]);
            }
        }
        done();
    });


    it('should place a word on the first turn', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        let score = placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);
        expect(score).to.equal(2);
        done();
    });

    it('should not place words on already occupied cells', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        grid.updateCells(wordsAlreadyOnGrid1);
        let score = placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);
        expect(score).to.equal(-1);
        done();
    });

    it('should place a word using already occupied cells', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        let score = placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);

        wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 8, ['N', 'O', 'N'], Orientation.VERTICAL);
        score = placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.VERTICAL);

        expect(score).to.equal(4);
        done();
    });

    it('should not place a word that doesn\'t touch the center on the first turn', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(8, 7, ['E', 'N'], Orientation.HORIZONTAL);
        let score = placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);
        expect(score).to.equal(-1);
        done();
    });

    it('should check if the word touches the center of the grid', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        let touchesOrigin = placeWordOperation.doesWordTouchOrigin(wordsAlreadyOnGrid1);

        expect(touchesOrigin).to.equal(true);

        wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(8, 7, ['E', 'N'], Orientation.HORIZONTAL);
        touchesOrigin = placeWordOperation.doesWordTouchOrigin(wordsAlreadyOnGrid1);

        expect(touchesOrigin).to.equal(false);

        done();
    });

    it('should check if the new word doesn\'t match already added cells', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);
        wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 8, ['N', 'O', 'N'], Orientation.VERTICAL);
        let checked = placeWordOperation.checkAlreadyAddedCells(wordsAlreadyOnGrid1);
        expect(checked).to.equal(true);
        done();
    });

    it('should check if there are letters at the word of the word', done => {
        let wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 7, ['E', 'N'], Orientation.HORIZONTAL);
        placeWordOperation.placeWordOnGrid(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);
        wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 9, ['N', 'O', 'N'], Orientation.HORIZONTAL);
        let checked = placeWordOperation.checkLettersAtEdges(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);

        expect(checked).to.equal(true);

        wordsAlreadyOnGrid1 = CellsOperations.convertWordToCells(7, 12, ['N', 'O', 'N'], Orientation.HORIZONTAL);
        checked = placeWordOperation.checkLettersAtEdges(wordsAlreadyOnGrid1, Orientation.HORIZONTAL);

        expect(checked).to.equal(false);

        done();
    });

});
