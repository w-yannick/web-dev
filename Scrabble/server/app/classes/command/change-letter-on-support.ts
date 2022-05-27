import { Command } from './command';
import { LettersManager } from '../letters-manager';

export class ChangeLetterOnSupport extends Command {

    public execute(): string {

        let letterStock = this.party.getLetterStock();
        let lettersToSwap = Array.from(this.message.slice(9, 16).toUpperCase());

        if (!this.player.belongsToSupport(lettersToSwap)) {
            return 'Une de(s) lettre(s) suivante(s) '
                + lettersToSwap.toString()
                + " n'appartiennent pas à votre chevalet.";
        }

        if (!(letterStock.length >= lettersToSwap.length)) {
            return 'La réserve ne contient plus assez de lettres';
        }

        let swapedLetters = LettersManager.swapLetters(letterStock, lettersToSwap);
        this.player.updateSupport(swapedLetters, lettersToSwap);
        this.party.nextTour();

        return this.message;
    }

}
