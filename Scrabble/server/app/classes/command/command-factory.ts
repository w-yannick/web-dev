import { Party } from '../party';
import { Command } from './command';
import { NeedHelp } from './need-help';
import { PassTurn } from './pass-turn';
import { ChangeLetterOnSupport } from './change-letter-on-support';
import { PlaceWord } from './place-word';

// regex for match with "!placer <ligne><colonne>(h|v) <mot>"
const PATTERN_PLACE_COMMAND = /!placer [a-o]([1-9]|1[0-5])[hv] [a-zA-Z]{1,23}$/;

// regex for match with "changer <lettre><lettre>..."
const PATTERN_CHANGE_COMMAND = /!changer ([a-z]|[*]){1,7}$/;

export class CommandFactory {

    private program: Command;

    public createCommand(message: string, playerName: string, party: Party): string {

        let error: string;
        let player = party.findPlayer(playerName);

        if (message === '!aide') {
            this.program = new NeedHelp(party, player);
            return error;
        }

        if (!player.getCanPlay()) {
            error = "Ce n'est pas à vous de jouer";
        }
        else if (message === '!passer') {
            this.program = new PassTurn(party, player, message);
        }
        else if (PATTERN_CHANGE_COMMAND.test(message)) {
            this.program = new ChangeLetterOnSupport(party, player, message);
        }
        else if (PATTERN_PLACE_COMMAND.test(message)) {
            this.program = new PlaceWord(party, player, message);
        }
        else {
            error = 'Syntaxe invalide';
        }

        return error;
    }

    public runProgram(): string {
        if (this.program !== undefined) {
            return this.program.execute();
        }
    }

}
