import { expect } from 'chai';

import { GameStatusService } from '../game-status.service';

describe('GameStatusService', () => {

    let service: GameStatusService;

    beforeEach(() => { service = new GameStatusService(); });

    it('setPlayerName should change the player name correctly', () => {
        service.setPlayerName("FajitaDellaMuerte");
        expect(service.getPlayerName()).to.equal('FajitaDellaMuerte');
    });

    it('setDifficulty should change the difficulty correctly', () => {
        service.setDifficulty("hard");
        expect(service.getDifficulty()).to.equal('hard');
    });

});
