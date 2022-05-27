import { Injectable } from '@angular/core';
import { Player } from '../classes/player';


@Injectable()
export class GameInfoService {

    private player: Player = new Player();
    private groupSize: number;

    public setPlayerName(name: string): void {
        this.player.name = name;
    }

    public getPlayerName(): string {
        return this.player.name;
    }

    public getPlayer(): Player {
        return this.player;
    }

    public getGroupSize(): number {
        return this.groupSize;
    }

    public setGroupSize(groupSize: number): void {
        this.groupSize = groupSize;
    }
}
