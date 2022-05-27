import { Injectable } from '@angular/core';

import { Settings } from '../classes/global/settings';
import { Difficulty } from '../classes/global/enums';
import { Player } from '../classes/players/player';
import { HumanPlayer } from '../classes/players/human-player';

@Injectable()
export class GameInfoService {

    private humanPlayer = new HumanPlayer();
    private aiPlayer = new Player();

    private difficulty: Difficulty;
    private round = 1;

    // Player

    public setPlayerName(name: string): void {
        this.humanPlayer.setName(name);
    }

    public getPlayerName(): string {
        return this.humanPlayer.getName();
    }

    public getPlayerScore(): number {
        return this.humanPlayer.getScore();
    }

    public setPlayerScore(score: number): void {
        this.humanPlayer.setScore(score);
    }

    public getPlayerStones(): number {
        return this.humanPlayer.getRemainingStones();
    }

    public decrementPlayerStones(): void {
        this.humanPlayer.decrementRemainingStones();
    }

    // AI

    public getAiScore(): number {
        return this.aiPlayer.getScore();
    }

    public setAiScore(score: number): void {
        this.aiPlayer.setScore(score);
    }

    public getAiStones(): number {
        return this.aiPlayer.getRemainingStones();
    }

    public decrementAiStones(): void {
        this.aiPlayer.decrementRemainingStones();
        if (this.aiPlayer.getRemainingStones() === 0) {
            this.humanPlayer.resetRemainingStones();
            this.aiPlayer.resetRemainingStones();
        }
    }

    // General

    public getRound(): number {
        return this.round;
    }

    public incrementRound(): void {
        this.round++;
    }

    public isFinished(): boolean {
        return (this.round > Settings.NUMBER_OF_ROUNDS);
    }

    public resetGame(): void {
        this.round = 1;
        this.aiPlayer.setScore(0);
        this.humanPlayer.setScore(0);
    }

    public setDifficulty(difficulty: Difficulty): void {
        this.difficulty = difficulty;
    }

    public getDifficulty(): Difficulty {
        return this.difficulty;
    }

}
