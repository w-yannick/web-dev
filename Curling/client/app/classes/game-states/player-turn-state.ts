import { appInjector } from '../../modules/app.module';

import { Settings } from '../global/settings';
import { Cursor } from '../global/enums';

import { Cart } from '../general/cart';

import { State } from './state';
import { PowerSelectionState } from './power-selection-state';

import { HudService } from '../../services/hud.service';

export class PlayerTurnState extends State {

    private hudService: HudService;

    constructor() {
        super();
        this.hudService = appInjector.get(HudService);
        Cart.activeStone.resetStone();
        Cart.activeStone.getMesh().visible = true;
    }

    public treatMouseDown(): void {
        if (this.gameInfoService.getPlayerStones() === Settings.NUMBER_OF_STONES) {
            for (let i = 0; i < 2 * Settings.NUMBER_OF_STONES; i++) {
                Cart.stones[i].resetStone();
            }
        }
        Cart.activeStone.getMesh().visible = true;
        this.hudService.choosePower();
        this.hudService.setCursor(Cursor.NONE);

        this.gameService.state = new PowerSelectionState();

    }

}
