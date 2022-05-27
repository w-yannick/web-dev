import { Component, Renderer, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

import { Player } from '../classes/player';
import { SocketService } from '../services/socket.service';
import { GameInfoService } from '../services/game-info.service';

const TIME_PLAY = 5 * 60 - 3;

@Component({
    moduleId: module.id,
    selector: 'my-game-status',
    templateUrl: '/assets/templates/game-status-component-template.html',
    styleUrls: ['../../assets/stylesheets/game-status-component-style.css']
})

export class GameStatusComponent implements OnInit {

    private players: Player[];
    private activePlayer: Player;
    private subscription: Subscription;
    private ticks = 0;
    private isEndOfParty = false;

    private closeModal = false;
    private modalCalled = false;

    constructor(
        private gameInfoService: GameInfoService,
        private socketService: SocketService,
        private renderer: Renderer,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.activePlayer = new Player("");
        this.setPlayers();
        this.startTimer();
        this.someoneHasLeft();
    }

    private setPlayers(): void {
        this.socketService.get().on('newPlayersStatus', (players: Player[]) => {
            this.players = players;
            this.activePlayer = players.find((player) => {
                return player.canPlay;
            });
            if (this.activePlayer === undefined) {
                this.isEndOfParty = true;
                this.modalCalled = true;
                this.listenEscapeEvent();
            }
            this.subscription.unsubscribe();
            this.startTimer();
        });
        this.socketService.get().emit('needPlayersStatus');
    }

    private startTimer(): void {
        let timer = Observable.timer(2000, 1000);
        this.subscription = timer.subscribe(t => {
            this.ticks = TIME_PLAY - t;
            if (this.ticks === 0) {
                this.subscription.unsubscribe();
            }
        });
    }

    private listenEscapeEvent(): void {
        this.renderer.listen(document, 'keydown', (event: KeyboardEvent) => {
            if (event.code === 'Escape' && this.isEndOfParty) {
                this.leaveParty();
            }
        });
    }

    private leaveParty(): void {
        this.isEndOfParty = false;
        this.socketService.leaveParty();
        this.router.navigate(['/player-name']);
    }

    private someoneHasLeft(): void {
        this.socketService.get().on('someoneHasLeft', (playerName: string) => {
            this.players.forEach((player) => {
                if (player.name === playerName) {
                    player.hasLeft = true;
                }
            });
        });
    }

    // TSLint unused variable : utilisé dans le HTML
    private nameOfBestPlayer(): string {
        let score = 0;
        let name = "";
        this.players.forEach((player) => {
            if (player.score >= score) {
                name = player.name;
                score = player.score;
            }
        });
        return name;
    }

    // TSLint unused variable : utilisé dans le HTML
    private hideModal(): void {
        this.closeModal = true;
        this.modalCalled = false;
    }
}
