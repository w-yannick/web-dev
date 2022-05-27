import * as SocketIO from 'socket.io';
import * as http from 'http';

import { Message } from './message';
import { PartyManager } from './party-manager';
import { CommandFactory } from '../classes/command/command-factory';

export class SocketService {

    private io: SocketIO.Server;
    private roomId: number[];
    private partyManager: PartyManager;
    private commandFactory: CommandFactory;

    constructor(server: http.Server) {
        this.io = SocketIO(server);
        this.roomId = [0, 0, 0];
        this.partyManager = new PartyManager();
        this.commandFactory = new CommandFactory();
    }

    public launchSocket(): void {

        this.io.on('connection', (socket: any) => {

            console.log('Client connected');

            socket.on('joinParty', (groupSize: number, playerName: string) => {

                let room: string;
                console.log('nom du joueur: ' + playerName);
                // Correction TSlint === cause des problemes alors que groupe
                // size sont tous les 2 des number

                if ((Number)(groupSize) === (Number)(2)) {
                    room = "room2-";
                }
                else if ((Number)(groupSize) === (Number)(3)) {
                    room = "room3-";
                }
                else if ((Number)(groupSize) === (Number)(4)) {
                    room = "room4-";
                }

                if ((Number)(this.roomId[groupSize - 2]) === (0)) {
                    this.partyManager.createNewParty(room + (++this.roomId[groupSize - 2]), this.io);
                }

                socket.playerName = playerName;
                socket.room = room + this.roomId[groupSize - 2];
                socket.join(socket.room);

                this.partyManager.getParty(socket.room).addPlayer(playerName);

                this.io.sockets.in(socket.room).emit('numberOfMissingPlayers',
                    groupSize - this.io.sockets.adapter.rooms[socket.room].length);

                console.log(" connected on : " + room + this.roomId[groupSize - 2]);

                // Correction TSlint === cause des problemes
                if ((Number)(this.io.sockets.adapter.rooms[socket.room].length) === (Number)(groupSize)) {
                    this.io.sockets.in(socket.room).emit('startParty', true);
                    this.partyManager.getParty(socket.room).startPlay();
                    this.partyManager.createNewParty(room + (++this.roomId[groupSize - 2]), this.io);
                }
            });

            socket.on('needGrid', () => {
                this.sendGrid(socket);
            });

            socket.on('needSupport', () => {
                this.sendSupport(socket);
            });

            socket.on('needPlayersStatus', () => {
                this.sendPlayerStatus(socket);
            });

            socket.on('leaveParty', () => {
                this.partyManager.getParty(socket.room).deletePlayer(socket.playerName);
                this.io.sockets.in(socket.room).emit('someoneHasLeft', socket.playerName);
                socket.leave(socket.room);
                console.log('leave room');
            });

            socket.on('message', (message: Message) => {

                let error: string;
                let newMessage = message;

                if (message.isCommand) {

                    error = this.commandFactory.createCommand(
                        message.content,
                        socket.playerName,
                        this.partyManager.getParty(socket.room)
                    );

                    if (error === undefined) {
                        error = this.commandFactory.runProgram();
                        this.sendGrid(socket);
                        this.sendSupport(socket);
                        this.sendPlayerStatus(socket);
                    }

                    newMessage = new Message(error, socket.playerName, true);
                }
                console.log('[server](message): %s', JSON.stringify(newMessage));
                this.io.sockets.in(socket.room).emit('message', newMessage);
            });

            socket.on('disconnect', () => {
                if (this.partyManager.getParty(socket.room) !== undefined) {
                    this.io.sockets.in(socket.room).emit('someoneHasLeft', socket.playerName);
                    this.partyManager.getParty(socket.room).deletePlayer(socket.playerName);
                }

                socket.leave(socket.room);
                this.sendPlayerStatus(socket);
                console.log('Client disconnected');
            });

        });
    }

    public sendPlayerStatus(socket: any): void {
        this.io.sockets.in(socket.room).emit('newPlayersStatus', this.partyManager.getParty(socket.room).getPlayers());
    }

    public sendGrid(socket: any): void {
        this.io.sockets.in(socket.room).emit(
            'newGrid',
            this.partyManager.getParty(socket.room).getGrid().getAllCells()
        );
    }

    public sendSupport(socket: any): void {
        socket.emit('newSupport', this.partyManager.getParty(socket.room).findPlayer(socket.playerName).getSupport());
    }
}
