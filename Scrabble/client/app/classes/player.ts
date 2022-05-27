export class Player {

    public name: string;
    public score: number;
    public numberOfLettersOnTheSupport: number;
    public canPlay: boolean;
    public hasLeft: boolean;

    constructor(name: string = undefined) {
        this.score = 0;
        this.numberOfLettersOnTheSupport = 0;
        this.name = name;
        this.hasLeft = false;
    }

    public setCanPlay(canPlay: boolean): void {
        this.canPlay = canPlay;
    }

    public getCanPlay(): boolean {
        return this.canPlay;
    }

}
