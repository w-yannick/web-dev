import { appInjector } from '../../modules/app.module';

import { Cursor } from '../global/enums';

import { MovementState } from './movement-state';
import { State } from './state';

import { StoneThrowingService } from '../../services/stone-throwing.service';
import { HudService } from '../../services/hud.service';

export class PowerSelectionState extends State {

    private stoneThrowingService: StoneThrowingService;
    private hudService: HudService;

    constructor() {
        super();
        this.stoneThrowingService = appInjector.get(StoneThrowingService);
        this.hudService = appInjector.get(HudService);
    }

    public treatMouseUp(): void {
        let power = this.hudService.selectPower();
        this.stoneThrowingService.throwActiveStone(power);
        this.hudService.setCursor(Cursor.RED_BROOM);

        this.gameService.state = new MovementState();
    }

}
