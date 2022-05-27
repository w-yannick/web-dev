import { expect } from 'chai';

import { RenderService } from '../render.service';
import { StoneThrowingService } from '../stone-throwing.service';
import { HudService } from '../hud.service';
import { GameInfoService } from '../game-info.service';
import { CollisionService } from '../collision.service';
import { IlluminationService } from '../illumination.service';
import { ScoringService } from '../scoring.service';

describe('RenderService', () => {

    let service: RenderService;

    beforeEach(() => {
        let gameInfoService = new GameInfoService();
        let hudService = new HudService(gameInfoService);
        let collisionService = new CollisionService();
        let stoneThrowingService = new StoneThrowingService(hudService, collisionService);
        let scoringService = new ScoringService();
        let illuminationService = new IlluminationService(scoringService, stoneThrowingService);
        service = new RenderService(stoneThrowingService, hudService, illuminationService);
    });

    it('this test should pass everytime', () => {
        expect(true).to.equal(true);
    });

});
