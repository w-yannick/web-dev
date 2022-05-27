import { Message } from '../classes/message';

import * as io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3002';

export class SocketService {

    private socket: SocketIOClient.Socket;

    constructor() {
        this.initSocket();
    }

    private initSocket(): void {
        this.socket = io.connect(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public sendGroupSize(groupSize: number, playerName: string): void {
        this.socket.emit('joinParty', groupSize, playerName);
    }

    public leaveParty(): void {
        this.socket.emit('leaveParty');
    }

    public get() {
        return this.socket;
    }

}
