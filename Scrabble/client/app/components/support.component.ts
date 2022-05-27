import { Component, Renderer, OnInit, ElementRef } from '@angular/core';

import { SocketService } from '../services/socket.service';
import { SelectionService } from '../services/selection.service';
import { SupportService } from '../services/support.service';
import { EventManager } from '../classes/event-manager';

@Component({
    moduleId: module.id,
    selector: 'my-support',
    templateUrl: '/assets/templates/support-component-template.html',
    styleUrls: ['../../assets/stylesheets/support-component-style.css']
})

export class SupportComponent implements OnInit {

    support: string[];
    private eventManager: EventManager;
    constructor(
        private socketService: SocketService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private selectionService: SelectionService,
        private supportService: SupportService
    ) {
    }

    ngOnInit(): void {
        this.socketService.get().on('newSupport', (letters: string[]) => {
            this.support = letters;
            this.supportService.setSupport(this.support);
        });
        this.socketService.get().emit('needSupport');
        this.eventManager = new EventManager(this.renderer, this.selectionService, this.supportService);
    }


    //TSlint unused method: utilise seulement dans l'html
    private clickSelection(): void {
        if (!this.supportIsSelected()) {
            this.selectionService.setSelection(false);
        }
    }

    private supportIsSelected(): boolean {
        return !(this.selectionService.getSelection());
    }

    //TSlint unused method: utilise seulement dans l'html
    private getSelectedLetter(): number {
        return this.selectionService.getSelectedLetter();
    }

    //TSlint unused method: utilise seulement dans l'html
    private setSelectedLetter(index: number): void {
        this.selectionService.setSelectedLetter(index);
    }

}
