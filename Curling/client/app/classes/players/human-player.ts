import { Player } from './player';

export class HumanPlayer extends Player {

    private name: string;

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

}
