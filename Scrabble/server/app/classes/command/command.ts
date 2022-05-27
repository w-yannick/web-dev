import { Party } from '../party';
import { Player } from '../player';

export abstract class Command {

    protected party: Party;
    protected player?: Player;
    protected message?: string;

    constructor(party: Party,
        player?: Player,
        message?: string,
    ) {
        this.party = party;
        this.player = player;
        this.message = message;
    }

    public execute(): string {
        return undefined;
    }

    public setMessage(message: string): void {
        this.message = message;
    }

}
