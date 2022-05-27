import { appInjector } from '../../modules/app.module';
import { State } from './state';
import { HighScores } from '../general/high-scores';
import { HudService } from '../../services/hud.service';
import { RenderService } from '../../services/render.service';

export class EndState extends State {

    private highScores: HighScores;
    private hudService: HudService;
    private renderService: RenderService;

    constructor() {
        super();
        this.highScores = new HighScores();
        this.hudService = appInjector.get(HudService);
        this.renderService = appInjector.get(RenderService);

        this.highScores.updateAndGetHighScores();
        setTimeout(() => {
            this.hudService.displayReplayButton();
            this.hudService.displayLeaveButton();
        }, 6000);
        this.renderService.getVictoryAnimation().enableAnimation(true);
    }

}
