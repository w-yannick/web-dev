import { expect } from 'chai';

import { Settings } from '../../classes/global/settings';

import { GameInfoService } from '../game-info.service';
import { Difficulty } from '../../classes/global/enums';

describe('GameInfoService', () => {

    let service: GameInfoService;

    beforeEach(() => { service = new GameInfoService(); });

    it('name should be undefined by default (for route checking)', () => {
        expect(service.getPlayerName()).to.be.undefined;
    });

    it('score should be set to 0 by default', () => {
        expect(service.getPlayerScore()).to.equal(0);
    });

    it('setPlayerName should change the player name correctly', () => {
        service.setPlayerName("FajitaDellaMuerte");
        expect(service.getPlayerName()).to.equal('FajitaDellaMuerte');
    });

    it('setDifficulty should change the difficulty correctly', () => {
        service.setDifficulty(Difficulty.HARD);
        expect(service.getDifficulty()).to.equal(Difficulty.HARD);
    });

    it('setScore should change the score correctly', () => {
        service.setPlayerScore(99);
        expect(service.getPlayerScore()).to.equal(99);
    });

    it('setting ai stones to 0 should reset ai stones', () => {
        for (let i = 0; i < Settings.NUMBER_OF_STONES; i++) {
            service.decrementAiStones();
        }
        expect(service.getAiStones()).to.equal(Settings.NUMBER_OF_STONES);
    });

    it('player stones should be remaxed when ai stones fall to 0', () => {
        service.decrementPlayerStones();
        for (let i = 0; i < Settings.NUMBER_OF_STONES; i++) {
            service.decrementAiStones();
        }
        expect(service.getPlayerStones()).to.equal(Settings.NUMBER_OF_STONES);
    });

});
