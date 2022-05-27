import { Component, OnInit, Renderer, ElementRef } from '@angular/core';

import { GameInfoService } from '../services/game-info.service';
import { SocketService } from '../services/socket.service';
import { Message } from '../classes/message';
import { SelectionService } from '../services/selection.service';


@Component({
    moduleId: module.id,
    selector: 'my-chat',
    templateUrl: '/assets/templates/chat-component-template.html',
    styleUrls: ['../../assets/stylesheets/chat-component-style.css']
})

export class ChatComponent implements OnInit {

    private playerName: string;
    private messageContent: string;
    private messages: Message[] = [];

    constructor(
        private gameInfoService: GameInfoService,
        private socketService: SocketService,
        private renderer: Renderer,
        private elementRef: ElementRef,
        private selectionService: SelectionService
    ) { }

    ngOnInit(): void {
        this.playerName = this.gameInfoService.getPlayerName();

        this.socketService.get().on('message', (message: Message) => {
            this.messages.push(message);
        });

        this.renderer.listen(this.elementRef.nativeElement, 'keyup', (event: KeyboardEvent) => {
            if (event.keyCode === 13) {
                this.send();
            }
        });

    }

    private send(): void {
        if (this.messageContent.indexOf('!') === 0) {
            this.socketService.send(new Message(this.messageContent, this.playerName, true));
            this.messageContent = "";
        }
        else {
            this.socketService.send(new Message(this.messageContent, this.playerName, false));
            this.messageContent = "";
        }
    }

    private chatIsSelected(): boolean { //utilisé dans le HTML
        return this.selectionService.getSelection();
    }

}
