export abstract class Sound {

    protected audio = document.createElement('audio');
    protected source = document.createElement('source');

    constructor() {
        this.audio.appendChild(this.source);
        this.audio.play();
    }

    public setVolume(volume: number) {
        if (volume <= 1 && volume >= 0) {
            this.audio.volume = volume;
        }
    }

}
