import { Command } from './command';
import { Orientation } from '../global/enums';
import { CellsOperations } from '../cells-operations';
import { LettersManager } from '../letters-manager';
import { ExtractCellsOperations } from '../grid-operations/extract-cells-operations';


const REG_EX = /[0-5]/;

export class PlaceWord extends Command {

    public execute(): string {

        let orientation = this.extractOrientation();
        let word = this.extractWord();
        let row = this.extractRow();
        let column = this.extractColumn();

        let numberOfLetterInUpperCase = this.numberOfLetterInUpperCase(word);

        let placeWordOperation = this.party.getPlaceWordOperations();

        if (!this.player.starBelongsToSupport(numberOfLetterInUpperCase)) {
            return "Vous n'avez pas assez de lettres blanches.";
        }

        this.convertWordToUpperCase(word);
        let cells = CellsOperations.convertWordToCells(row, column, word, orientation);
        let grid = placeWordOperation.getGrid();
        let cellsExtractor = new ExtractCellsOperations(grid);
        let newCells = cellsExtractor.extractNewCells(cells);
        let lettersToCheck = CellsOperations.cellsToLetters(newCells);

        if (!this.player.belongsToSupport(lettersToCheck)) {
            return 'Une de(s) lettre(s) suivante(s) '
                + lettersToCheck.toString()
                + " n'appartiennent pas à votre chevalet.";
        }

        if (placeWordOperation.checkLettersAtEdges(cells, orientation)) {
            return 'Le mot que vous cherchez à placer est hors plateau.';
        }

        let score = placeWordOperation.placeWordOnGrid(cells, orientation);

        if (!(score !== -1)) {
            return "Impossible de placer le mot, vérifiez : "
                + "Tous les nouveaux mots doivent appartenir au dictionnaire."
                + " - Le mot doit toucher au moins une lettre.";
        }

        let newLetters = LettersManager.generateLetters(newCells.length, this.party.getLetterStock());
        this.player.updateSupport(newLetters, CellsOperations.cellsToLetters(newCells));
        this.player.setScore(score);
        this.party.nextTour();

        return this.message;
    }

    public extractOrientation(): Orientation {
        let isHorizontal = (letter: string) => {
            return letter === "h";
        };
        let doesTwoNumbersForColumn = () => {
            return REG_EX.test(this.message.slice(10, 11));
        };
        return doesTwoNumbersForColumn() ?
            (isHorizontal(this.message.slice(11, 12)) ?
                Orientation.HORIZONTAL : Orientation.VERTICAL) :
            (isHorizontal(this.message.slice(10, 11)) ?
                Orientation.HORIZONTAL : Orientation.VERTICAL);
    }

    public extractWord(): string[] {
        return REG_EX.test(this.message.slice(10, 11)) ?
            Array.from(this.message.slice(13, 29)) : Array.from(this.message.slice(12, 28));

    }

    public extractRow(): number {
        return this.message.slice(8, 9).charCodeAt(0) - "a".charCodeAt(0);
    }

    public extractColumn(): number {
        return REG_EX.test(this.message.slice(10, 11)) ?
            Number(this.message.slice(9, 11)) - 1 : Number(this.message.slice(9, 10)) - 1;
    }

    public numberOfLetterInUpperCase(word: string[]): number {
        let nb = 0;
        for (let i = 0; i < word.length; i++) {
            if (word[i] === word[i].toUpperCase()) {
                nb++;
            }
        }
        return nb;
    }

    public convertWordToUpperCase(word: string[]): void {
        for (let i = 0; i < word.length; i++) {
            word[i] = word[i].toUpperCase();
        }
    }

}
