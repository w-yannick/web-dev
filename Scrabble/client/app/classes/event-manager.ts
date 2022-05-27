import { Renderer } from '@angular/core';

import { SelectionService } from '../services/selection.service';
import { SupportService } from '../services/support.service';

export class EventManager {

    private letterFoundIndex: number;
    private lastKey: number;

    constructor(private renderer: Renderer,
        private selectionService: SelectionService,
        private supportService: SupportService
    ) {
        this.listenKeyEvent();
        this.letterFoundIndex = 0;
    }


    private listenKeyEvent(): void {

        this.renderer.listen(document, 'mousedown', (event: KeyboardEvent) => {
            this.selectionService.setSelection(true);
        });

        this.renderer.listen(document, 'keydown', (event: KeyboardEvent) => {
            if (event.code === 'Tab') {
                event.preventDefault();
                event.stopPropagation();
                if (this.supportIsSelected()) {
                    this.selectionService.setSelection(true);
                    document.getElementById("chat-input").focus();
                } else {
                    this.selectionService.setSelection(false);
                    document.getElementById("chat-input").blur();
                }
            }
            if (this.supportIsSelected()) {
                let lettersFound = this.getAllIndexes(event.key.toUpperCase());
                let selectedLetter = this.selectionService.getSelectedLetter();
                if (event.code === 'ArrowRight') {
                    if (selectedLetter < 6) {
                        this.selectionService.swapLettersOnSupport(selectedLetter + 1);
                    } else {
                        this.selectionService.swapLettersOnSupport(0);
                    }
                }
                else if (event.code === 'ArrowLeft') {
                    if (selectedLetter > 0) {
                        this.selectionService.swapLettersOnSupport(selectedLetter - 1);
                    } else {
                        this.selectionService.swapLettersOnSupport(6);
                    }
                } else if (lettersFound.length > 0) {
                    this.setSelectedLetterKeyboard(event, lettersFound);

                }
            }
        });
    }


    private supportIsSelected(): boolean {
        return !(this.selectionService.getSelection());
    }

    private getAllIndexes(val: any): number[] {
        let indexes = [], i;
        for (i = 0; i < this.supportService.getSupport().length; i++) {
            if (this.supportService.getSupport()[i] === val) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    private setSelectedLetterKeyboard(event: any, lettersFound: number[]): void {
        if (event.key === this.lastKey) {
            this.letterFoundIndex = (this.letterFoundIndex + 1) % lettersFound.length;
        } else {
            this.letterFoundIndex = 0;
        }
        this.selectionService.setSelectedLetter(lettersFound[this.letterFoundIndex]);
        this.lastKey = event.key;
    }
}
