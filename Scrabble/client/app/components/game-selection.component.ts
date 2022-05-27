import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameInfoService } from '../services/game-info.service';

@Component({
    moduleId: module.id,
    selector: 'my-player-name',
    templateUrl: '/assets/templates/game-selection-component-template.html',
    styleUrls: ['../../assets/stylesheets/game-selection-component-style.css']
})

export class GameSelectionComponent {

    private playerName: string;
    private groupSize: number;

    constructor(
        private router: Router,
        private gameInfoService: GameInfoService
    ) { }

    startSession(): void {
        this.gameInfoService.setPlayerName(this.playerName);
        this.gameInfoService.setGroupSize(this.groupSize);
        this.router.navigate(['/wait']);
    }

}
