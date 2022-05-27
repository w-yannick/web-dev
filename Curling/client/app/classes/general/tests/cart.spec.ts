import { expect } from 'chai';

import { Color } from '../../global/enums';
import { Settings } from '../../global/settings';

import { Cart } from '../cart';
import { Stone } from '../stone';

describe('Cart', () => {

    beforeEach(() => {
        let scene = new THREE.Scene();
        for (let i = 0; i < Settings.NUMBER_OF_STONES; i++) {
            Cart.playerStones.push(new Stone(scene, Color.BLUE, true));
            Cart.stones.push(Cart.playerStones[i]);

            Cart.aiStones.push(new Stone(scene, Color.RED, true));
            Cart.stones.push(Cart.aiStones[i]);
        }
        Cart.activeStone = Cart.playerStones[0];
    });

    it('active stone should be blue by default', () => {
        expect(Cart.activeStone.getColor()).to.equal(Color.BLUE);
    });

    it('next stone should alternate between red and blue', () => {
        expect(Cart.activeStone.getColor()).to.equal(Color.BLUE);
        Cart.nextStone();
        expect(Cart.activeStone.getColor()).to.equal(Color.RED);
        Cart.nextStone();
        expect(Cart.activeStone.getColor()).to.equal(Color.BLUE);
        Cart.nextStone();
        expect(Cart.activeStone.getColor()).to.equal(Color.RED);
    });

});
