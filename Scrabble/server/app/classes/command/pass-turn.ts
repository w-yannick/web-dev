import { Command } from './command';

export class PassTurn extends Command {

    public execute(): string {
        this.party.nextTour();
        return this.message;
    }

}
