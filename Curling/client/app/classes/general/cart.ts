import { Settings } from '../global/settings';
import { Color } from '../global/enums';

import { Stone } from './stone';

export class Cart {

    public static playerStones: Stone[] = [];
    public static aiStones: Stone[] = [];
    public static stones: Stone[] = [];
    public static activeStone: Stone;

    public static init(scene: THREE.Scene) {
        for (let i = 0; i < Settings.NUMBER_OF_STONES; i++) {
            this.playerStones.push(new Stone(scene, Color.BLUE));
            this.stones.push(this.playerStones[i]);

            this.aiStones.push(new Stone(scene, Color.RED));
            this.stones.push(this.aiStones[i]);
        }
        this.activeStone = this.playerStones[0];
        setTimeout(() => {
            this.activeStone.getMesh().visible = true;
        },
        3000);
    }

    public static nextStone(): void {
        if (this.activeStone.getColor() === Color.RED) {
            let index = this.aiStones.findIndex((elem) => elem === this.activeStone);
            index = (index + 1) % Settings.NUMBER_OF_STONES;
            this.activeStone = this.playerStones[index];
        } else {
            let index = this.playerStones.findIndex((elem) => elem === this.activeStone);
            this.activeStone = this.aiStones[index];
        }
    }

}
