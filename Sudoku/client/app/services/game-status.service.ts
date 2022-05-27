import { Injectable } from '@angular/core';

@Injectable()
export class GameStatusService {

    private name: string;
    private difficulty: string;
    private hasSubmitted = false;
    private hasWon = false;

    setPlayerName(name: string): void {
        this.name = name;
    }

    getPlayerName(): string {
        return this.name;
    }

    setDifficulty(difficulty: string): void {
        this.difficulty = difficulty;
    }

    getDifficulty(): string {
        return this.difficulty;
    }

    setHasWon(hasWon: boolean): void {
        this.hasWon = hasWon;
    }

    getHasWon(): boolean {
        return this.hasWon;
    }

    setHasSubmitted(hasSubmitted: boolean): void {
        this.hasSubmitted = hasSubmitted;
    }

    getHasSubmitted(): boolean {
        return this.hasSubmitted;
    }

}
