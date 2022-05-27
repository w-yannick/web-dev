import { Injectable } from '@angular/core';

import { PlayerTurnState } from '../classes/game-states/player-turn-state';
import { State } from '../classes/game-states/state';

@Injectable()
export class GameService {

    public state: State;
    public mouse: THREE.Vector2;

    constructor() {
        this.state = new PlayerTurnState();
    }

    public treatMouseDown(e: THREE.Vector2): void {
        this.mouse = e;
        this.state.treatMouseDown();
    }

    public treatMouseUp(e: THREE.Vector2): void {
        this.mouse = e;
        this.state.treatMouseUp();
    }

    public treatSpaceKey(): void {
        this.state.treatSpaceKey();
    }

}
