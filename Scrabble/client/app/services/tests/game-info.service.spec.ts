import { expect } from 'chai';

import { GameInfoService } from '../game-info.service';

describe('GameInfoService', () => {

    let service: GameInfoService;

    beforeEach(() => { service = new GameInfoService(); });

    it('player name should be undefined by default', () => {
        expect(service.getPlayerName()).to.equal(undefined);
    });

    it('setPlayerName should change the player name correctly', () => {
        service.setPlayerName("FajitaDellaMuerte");
        expect(service.getPlayerName()).to.equal('FajitaDellaMuerte');
    });

});
