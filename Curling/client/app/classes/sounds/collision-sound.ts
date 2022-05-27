import { Sound } from './sound';

export class CollisionSound extends Sound {

    constructor() {
        super();
        this.source.src = 'assets/sounds/hit.mp3';
    }

}
