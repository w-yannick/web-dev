import { Settings } from '../global/settings';

export class Player {

    protected score: number;
    protected remainingStones: number;

    constructor() {
        this.score = 0;
        this.remainingStones = Settings.NUMBER_OF_STONES;
    }

    public getScore(): number {
        return this.score;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public getRemainingStones(): number {
        return this.remainingStones;
    }

    public decrementRemainingStones(): void {
        if (this.remainingStones > 0) {
            this.remainingStones--;
        }
    }

    public resetRemainingStones() {
        this.remainingStones = Settings.NUMBER_OF_STONES;
    }

}
