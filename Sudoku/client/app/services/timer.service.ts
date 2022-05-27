import { Injectable } from '@angular/core';

@Injectable()
export class TimerService {

    private timer: NodeJS.Timer;
    private seconds: number;
    private minutes: number;
    private isVisible: boolean;

    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.isVisible = true;
    }

    public setTime(seconds: number, minutes: number): void {
        this.seconds = seconds;
        this.minutes = minutes;
    }

    public getTime(): Object {
        return { seconds: this.seconds, minutes: this.minutes };
    }

    public getVisibility(): boolean {
        return this.isVisible;
    }

    public toggleVisibility(): void {
        this.isVisible = !this.isVisible;
    }
    public startTimer(): void {
        this.timer = setInterval(() => {
            this.seconds++;
            if (this.seconds % 60 === 0) {
                this.minutes++;
            }
        }, 1000);
    }

    public resetTimer(): void {
        this.seconds = 0;
        this.minutes = 0;
    }

    public stopTimer(): void {
        clearInterval(this.timer);
    }
}
