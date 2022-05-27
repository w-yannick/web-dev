import { Component, OnInit } from '@angular/core';

import { GridService } from '../services/grid.service';
import { GameInfoService } from '../services/game-info.service';
import { SocketService } from '../services/socket.service';

@Component({
    moduleId: module.id,
    selector: 'my-grid',
    templateUrl: '/assets/templates/grid-component-template.html',
    styleUrls: ['../../assets/stylesheets/grid-component-style.css']
})

export class GridComponent implements OnInit {

    private cells: any[][];
    private playerName: string;
    //TSlint unused variable: utilise seulement dans l'html
    private letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o"];

    constructor(
        private socketService: SocketService,
        private gridService: GridService,
        private gameInfoService: GameInfoService
    ) { }

    ngOnInit(): void {
        this.getGrid();
        this.playerName = this.gameInfoService.getPlayerName();
    }

    public getGrid(): void {
        this.socketService.get().on('newGrid', (cells: any[][]) => {
            this.cells = cells;
        });
        this.socketService.get().emit('needGrid');
    }

}
