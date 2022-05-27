import { expect } from 'chai';

import { HumanPlayer } from './human-player';
import { Player } from './player';

describe('Player', () => {

    let player: Player;

    beforeEach(() => {
        player = new Player();
    });

    it('initial score should be 0', () => {
        expect(player.getScore()).to.equal(0);
    });

    it('setScore should correctly update the score', () => {
        const SCORE = 10;
        player.setScore(SCORE);
        expect(player.getScore()).to.equal(SCORE);
    });

});

describe('HumanPlayer', () => {

    let player: HumanPlayer;

    beforeEach(() => {
        player = new HumanPlayer();
    });

    it('setName should correctly update the name', () => {
        const NAME = "FAJITA";
        player.setName(NAME);
        expect(player.getName()).to.equal(NAME);
    });

});
