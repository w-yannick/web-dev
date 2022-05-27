import { Sound } from './sound';

export class SweepSound extends Sound {

    constructor() {
        super();
        this.source.src = 'assets/sounds/sweep.mp3';
    }

}
