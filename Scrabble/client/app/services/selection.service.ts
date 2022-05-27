import { Injectable } from '@angular/core';
import { SupportService } from '../services/support.service';

@Injectable()
export class SelectionService {
    private chatIsSelected: boolean;
    private selectedLetter: number;
    constructor(
        private supportService: SupportService
    ) {
        this.chatIsSelected = false;
        this.selectedLetter = 0;
    }

    public getSelection(): boolean {
        return this.chatIsSelected;
    }

    public getSelectedLetter(): number {
        return this.selectedLetter;
    }

    public setSelectedLetter(index: number): void {
        this.selectedLetter = index;
    }

    public swapLettersOnSupport(indexToShiftWith: number): void {
        let selection = this.selectedLetter;
        this.supportService.swapLetters(selection, indexToShiftWith);

        this.selectedLetter = indexToShiftWith;
    }

    public setSelection(chatSelected: boolean): void {
        this.chatIsSelected = chatSelected;
    }

}
