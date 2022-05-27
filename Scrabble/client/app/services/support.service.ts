import { Injectable } from '@angular/core';

@Injectable()
export class SupportService {

    private support: string[];

    public getSupport(): string[] {
        return this.support;
    }

    public setSupport(support: string[]): void {
        this.support = support;
    }

    public swapLetters(startIndex: number, endIndex: number): void {
        let temp = this.support[startIndex];
        this.support[startIndex] = this.support[endIndex];
        this.support[endIndex] = temp;
    }
}
