import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameInfoService } from '../services/game-info.service';
import { Difficulty } from '../classes/global/enums';

@Component({
    moduleId: module.id,
    selector: 'my-game-selection',
    templateUrl: "../../assets/templates/game-selection-component-template.html",
    styleUrls: ['../../assets/stylesheets/game-selection-component-style.css']
})

export class GameSelectionComponent {

    public name: string;
    public difficulty: String;

    constructor(
        private router: Router,
        private gameInfoService: GameInfoService
    ) { }

    public startSession(): void {
        this.gameInfoService.setPlayerName(this.name);

        if (this.difficulty === 'easy') {
            this.gameInfoService.setDifficulty(Difficulty.EASY);
        }
        else {
            this.gameInfoService.setDifficulty(Difficulty.HARD);
        }

        this.router.navigate(['/play']);
    }

}
