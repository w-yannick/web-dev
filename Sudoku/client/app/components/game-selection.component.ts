import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameStatusService } from '../services/game-status.service';

@Component({
    moduleId: module.id,
    selector: 'my-game-selection',
    templateUrl: "../../assets/templates/game-selection-component-template.html",
    styleUrls: ['../../assets/stylesheets/game-selection-component-style.css']
})

export class GameSelectionComponent {

    public name: string;
    public difficulty: string;

    constructor(
        private router: Router,
        private gameStatusService: GameStatusService
    ) { }


    startSession(): void {
        this.gameStatusService.setPlayerName(this.name);
        this.gameStatusService.setDifficulty(this.difficulty);
        this.router.navigate(['/play']);
    }

}
