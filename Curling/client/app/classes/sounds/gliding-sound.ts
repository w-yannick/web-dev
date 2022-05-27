import { Sound } from './sound';

export class GlidingSound extends Sound {

    constructor() {
        super();
        this.source.src = 'assets/sounds/gliding.mp3';
        this.audio.loop = true;
        this.setVolume(0);
    }

    public stop() {
        this.audio.pause();
    }

}
