import { Grid } from './grid';
import { Player } from './player';

import * as LETTER_STOCK from '../data/letter-stock.data';
import { LettersManager } from './letters-manager';
import { PlaceWordOperation } from './grid-operations/place-word-operation';

const TIME_TOUR = 5 * 60 * 1000;

export class Party {

    private io: SocketIO.Server;
    private id: string;
    private players: Player[];
    private grid: Grid;
    private letterStock: string[];
    private timerTour: NodeJS.Timer;
    private placeWordOperation: PlaceWordOperation;

    constructor(id: string, io: SocketIO.Server) {
        this.id = id;
        this.players = new Array<Player>();
        this.grid = new Grid();
        this.letterStock = new Array<string>();
        this.letterStock = LETTER_STOCK.map(function (gridToCopy) {
            return gridToCopy.slice();
        });
        this.placeWordOperation = new PlaceWordOperation(this.grid);
        this.io = io;
    }

    public deletePlayer(playerName: string): void {
        LettersManager.returnLetters(this.letterStock, this.findPlayer(playerName).getSupport());
        if (this.findPlayer(playerName).getCanPlay()) {
            this.nextTour();
        }
        this.players.splice(this.players.indexOf(this.findPlayer(playerName)), 1);
    }

    public startPlay(): void {
        this.setRandomPlayOrder();
        this.assingnRandomSupportForPlayers();
        this.players[0].setCanPlay(true);

        this.initTimerTour();

    }

    public initTimerTour(): void {
        this.timerTour = setTimeout(
            () => {
                this.nextTour();
                this.io.sockets.in(this.id).emit('newPlayersStatus', this.players);
            },
            TIME_TOUR
        );
    }

    public nextTour(): void {
        clearTimeout(this.timerTour);
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getCanPlay()) {
                this.players[i].setCanPlay(false);
                this.players[(++i) % this.players.length].setCanPlay(true);
            }
        }
        this.initTimerTour();
    }

    public addPlayer(playerName: string): void {
        this.players.push(new Player(playerName));
    }

    public findPlayer(playerName: string): Player {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getName() === playerName) {
                return this.players[i];
            }
        }
    }

    public getLetterStock(): string[] {
        return this.letterStock;
    }

    public getGrid(): Grid {
        return this.grid;
    }

    public getPlaceWordOperations(): PlaceWordOperation {
        return this.placeWordOperation;
    }

    public getPlayers(): Array<Player> {
        return this.players;
    }

    public setRandomPlayOrder(): void {
        this.shuffleArray(this.players);
    }

    public setLetterStock(letterStock: string[]): void {
        this.letterStock = letterStock;
    }

    public getActivePlayer(): Player {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].getCanPlay()) {
                return this.players[i];
            }
        }
    }

    public assingnRandomSupportForPlayers(): void {
        for (let i = 0; i < this.players.length; i++) {
            this.players[i].setSupport(
                LettersManager.generateLetters(7, this.letterStock)
            );
        }
    }
    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
    */
    private shuffleArray(array: Array<any>): Array<any> {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}
