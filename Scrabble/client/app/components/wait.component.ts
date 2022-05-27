import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { GameInfoService } from '../services/game-info.service';
import { SocketService } from '../services/socket.service';

@Component({
    moduleId: module.id,
    selector: 'my-wait',
    templateUrl: '/assets/templates/wait-component-template.html',
    styleUrls: ['../../assets/stylesheets/wait-component-style.css']
})

export class WaitComponent implements OnInit, OnDestroy {

    private numberOfMissingPlayers: number;
    private onWaitRoom = true;

    constructor(
        private gameInfoService: GameInfoService,
        private router: Router,
        private socketService: SocketService,
        private renderer: Renderer
    ) { }

    ngOnInit() {
        this.socketService.sendGroupSize(
            this.gameInfoService.getGroupSize(),
            this.gameInfoService.getPlayer().name
        );

        this.socketService.get().on('numberOfMissingPlayers', (numberOfMissingPlayers: number) => {
            this.numberOfMissingPlayers = numberOfMissingPlayers;
        });

        this.socketService.get().on('startParty', (isPartyFull: boolean) => {
            if (isPartyFull) {
                this.router.navigate(['/play']);
            }
        });
        this.listenEscapeEvent();
    }

    ngOnDestroy() {
        this.onWaitRoom = false;
    }

    public listenEscapeEvent(): void {
        this.renderer.listen(document, 'keydown', (event: KeyboardEvent) => {
            if ((event.code === 'Escape') && this.onWaitRoom) {
                this.socketService.get().emit('leaveParty');
                this.router.navigate(['/player-name']);
            }
        });
    }
}
