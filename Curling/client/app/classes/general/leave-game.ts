import { appInjector } from '../../modules/app.module';

import { Cart } from '../general/cart';
import { PlayerTurnState } from '../game-states/player-turn-state';

import { HudService } from '../../services/hud.service';
import { GameService } from '../../services/game.service';
import { GameInfoService } from '../../services/game-info.service';
import { RenderService } from '../../services/render.service';

export class LeaveGame {

    private hudService: HudService;
    private gameInfoService: GameInfoService;
    private gameService: GameService;
    private renderService: RenderService;

    constructor() {
        this.hudService = appInjector.get(HudService);
        this.gameInfoService = appInjector.get(GameInfoService);
        this.gameService = appInjector.get(GameService);
        this.renderService = appInjector.get(RenderService);
    }

    public createNewGame() {
        this.hudService.removeReplayButton();
        this.hudService.removeLeaveButton();
        this.hudService.removeScoreTable();
        this.hudService.removeScores();
        this.renderService.victoryAnimation.reset();
        Cart.nextStone();
        this.gameInfoService.resetGame();
        this.hudService.updateScores();
        this.hudService.updateGameInfo();
        this.gameService.state = new PlayerTurnState();
    }

    public exit() {
        location.reload();
    }

}
