import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GetGridService } from '../services/get-grid.service';
import { GameStatusService } from '../services/game-status.service';
import { TimerService } from '../services/timer.service';
import { EventManager } from '../classes/event-manager';
import { SelectedCellService } from '../services/selected-cell.service';
import { GridChecker } from '../classes/grid-checker';

@Component({
    moduleId: module.id,
    selector: 'my-grid',
    templateUrl: '../../assets/templates/grid-component-template.html',
    styleUrls: ['../../assets/stylesheets/grid-component-style.css']
})

export class GridComponent implements OnInit {

    public grid: number[][];
    public inputGrid: any[][];
    public isCurrentlyLoading = true;
    public isValid = true;
    public selectedCellService: SelectedCellService;
    public isCompletedGrid = false;
    private gridId: number;
    private gridChecker: GridChecker;

    constructor(
        private router: Router,
        private getGridService: GetGridService,
        public gameStatusService: GameStatusService,
        private timerService: TimerService
    ) { }

    ngOnInit() {
        if (this.gameStatusService.getPlayerName() === undefined) {
            this.router.navigate(['/game-selection']);

            return;
        }

        this.getNewGrid();
        this.timerService.resetTimer();
        this.timerService.startTimer();
    }



    public toggleTimer(): void {
        this.timerService.toggleVisibility();
    }

    public getTimerVisibility(): boolean {
        return this.timerService.getVisibility();
    }

    public getNewGrid(): void {
        let getGridFunction = this.getGridService.getEasyGrid();
        if (this.gameStatusService.getDifficulty() === "hard") {
            getGridFunction = this.getGridService.getHardGrid();
        }

        getGridFunction.subscribe((resGrid: any) => {
            this.grid = resGrid['grid'];
            this.gridId = resGrid['id'];
            this.inputGrid = new Array(9);
            for (let i = 0; i < this.grid.length; i++) {
                this.inputGrid[i] = this.grid[i].slice();
            }
            this.isCurrentlyLoading = false;
            this.timerService.resetTimer();
            this.gridChecker = new GridChecker();
            this.selectedCellService = new SelectedCellService(this.grid);
            let eventManager = new EventManager(this.selectedCellService);
            window.addEventListener("keydown", (e) => eventManager.handleEvent(e.code));

        });
    }

    public checkInput(i: number, j: number): void {
        if (isNaN(this.inputGrid[i][j]) || this.inputGrid[i][j] === "" || this.inputGrid[i][j] === 0) {
            this.inputGrid[i][j] = null;
        }
        this.isValid = this.gridChecker.checkValidity(this.inputGrid);
    }

    public reset(): void {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === null) {
                    let input = document.getElementById(i + '_' + j) as HTMLInputElement;
                    input.value = null;
                }
            }
        }
        this.isValid = true;
        this.timerService.resetTimer();
    }

    public restart(changeDifficulty?: boolean): void {
        if (changeDifficulty === true) {
            if (this.gameStatusService.getDifficulty() === "easy") {
                this.gameStatusService.setDifficulty("hard");
            } else {
                this.gameStatusService.setDifficulty("easy");
            }
        }
        this.getNewGrid();
        this.isValid = true;
    }

    public getTime(): Object {
        return this.timerService.getTime();
    }

    public checkCompletion(): void {
        // on passe par une autre variable pour éviter un clignotement du bouton
        this.isCompletedGrid = this.gridChecker.checkCompletion(this.inputGrid);
    }

    public checkGrid(): void {
        this.gameStatusService.setHasSubmitted(true);
        this.getGridService.checkSolution(
            { grid: this.inputGrid, id: this.gridId }
        ).subscribe((response: any) => {
            if (response.isCorrect === true) {
                this.gameStatusService.setHasWon(true);
                this.timerService.stopTimer();
            } else {
                this.gameStatusService.setHasWon(false);
            }
        });
    }

    public hideModal(): void {
        this.gameStatusService.setHasSubmitted(false);
    }

    public setSelection(row: number, column: number) {
        this.selectedCellService.setSelection(row, column);
    }

    public getSelection(): Object {
        return this.selectedCellService.getSelection();
    }
}
