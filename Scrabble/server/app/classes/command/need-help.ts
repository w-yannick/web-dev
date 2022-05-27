import { Command } from './command';

const HELP_MESSAGE = `
    !placer <ligne><colonne>(h|v) <mot>
    - ligne et colonne servent à spécifier l’emplacement de la première lettre du mot.
    - L’orientation du mot est indiquée par h ou v qui signifient respectivement horizontale etverticale;
    !changer <lettre><lettre>...
    - L’argument lettre, qui doit être en minuscule, indique une lettre à changer;
    !passer 
    - passe le tour;
    `;

export class NeedHelp extends Command {

    public execute(): string {
        return "aide : " + HELP_MESSAGE;
    }

}
