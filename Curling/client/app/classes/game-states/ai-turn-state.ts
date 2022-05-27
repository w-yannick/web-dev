import { appInjector } from '../../modules/app.module';

import { Settings } from '../global/settings';
import { Color } from '../global/enums';

import { Cart } from '../general/cart';
import { AiLogic } from '../general/ai-logic';

import { State } from './state';
import { PlayerTurnState } from './player-turn-state';
import { EndState } from './end-state';

import { StoneThrowingService } from '../../services/stone-throwing.service';
import { HudService } from '../../services/hud.service';
import { ScoringService } from '../../services/scoring.service';

export class AiTurnState extends State {

    private stoneThrowingService: StoneThrowingService;
    private hudService: HudService;
    private scoringService: ScoringService;

    constructor() {
        super();
        this.stoneThrowingService = appInjector.get(StoneThrowingService);
        this.hudService = appInjector.get(HudService);
        this.scoringService = appInjector.get(ScoringService);

        Cart.nextStone();

        Cart.activeStone.getMesh().visible = true;
        let aiLogic = new AiLogic(this.gameInfoService, this.scoringService);
        aiLogic.throwStone();
    }

    public treatSpaceKey(): void {
        if (!this.stoneThrowingService.getIsAnyStoneMoving()) {
            this.stoneThrowingService.toggleLine();
            if (!this.gameInfoService.isFinished()) {
                this.gameInfoService.decrementAiStones();
                if (this.gameInfoService.getAiStones() === Settings.NUMBER_OF_STONES) {

                    let aiScore = this.gameInfoService.getAiScore();
                    aiScore += this.scoringService.countPoints(Color.RED);
                    this.gameInfoService.setAiScore(aiScore);
                    this.gameInfoService.incrementRound();
                    let playerScore = this.gameInfoService.getPlayerScore();
                    playerScore += this.scoringService.countPoints(Color.BLUE);
                    this.gameInfoService.setPlayerScore(playerScore);

                    this.hudService.updateScores();
                }
                this.hudService.updateGameInfo();
            }
            if (this.gameInfoService.isFinished()) {
                this.gameService.state = new EndState();
            } else {
                Cart.nextStone();
                //
                this.gameService.state = new PlayerTurnState();
            }
        }
    }

}
