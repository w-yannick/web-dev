import { expect } from 'chai';
import { AiLogic } from '../ai-logic';
import { GameInfoService } from '../../../services/game-info.service';
import { ScoringService } from '../../../services/scoring.service';


describe('AiLogic', () => {

    let aiLogic: AiLogic;
    let gameInfoService: GameInfoService;
    let scoringService: ScoringService;

    beforeEach(() => {
        gameInfoService = new GameInfoService();
        scoringService = new ScoringService();
        aiLogic = new AiLogic(gameInfoService, scoringService);
    });

    it('power should be equal to 2', () => {
        aiLogic.setPower(2);
        expect(aiLogic.getPower()).to.equal(2);
    });

    it('power should not be equal to 0', () => {
        aiLogic.setPower(2);
        expect(aiLogic.getPower()).to.not.equal(0);
    });

    it('should adjust direction', () => {
        let x = 1;
        aiLogic.adjustDirection(x);
        expect(x).to.not.equal(1.1);
    });

    it('should adjust direction', () => {
        let x = -1;
        aiLogic.adjustDirection(x);
        expect(x).to.not.equal(-1.1);
    });

    it('should eject opponent with power equal to 3', () => {
        aiLogic.ejectOpponent();
        expect(aiLogic.getPower()).to.equal(3);
    });

});
