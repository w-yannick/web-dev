import { appInjector } from '../../modules/app.module';

import { Cursor } from '../global/enums';
import { Settings } from '../global/settings';
import { Color } from '../global/enums';
import { Cart } from '../general/cart';

import { State } from './state';
import { AiTurnState } from './ai-turn-state';

import { BroomService } from '../../services/broom.service';
import { HudService } from '../../services/hud.service';
import { RenderService } from '../../services/render.service';
import { StoneThrowingService } from '../../services/stone-throwing.service';

import { SweepSound } from '../sounds/sweep-sound';

export class MovementState extends State {

    private broomService: BroomService;
    private hudService: HudService;
    private renderService: RenderService;
    private stoneThrowingService: StoneThrowingService;

    constructor() {
        super();
        this.stoneThrowingService = appInjector.get(StoneThrowingService);
        this.hudService = appInjector.get(HudService);
        this.broomService = appInjector.get(BroomService);
        this.renderService = appInjector.get(RenderService);
        this.broomService.init(this.renderService.getScene());
    }

    public treatSpaceKey(): void {
        if (!this.stoneThrowingService.getIsAnyStoneMoving()) {
            this.hudService.setCursor(Cursor.NORMAL);
            this.hudService.cursorOffset = 0;
            if (Cart.activeStone.getColor() === Color.BLUE) {
                this.gameInfoService.decrementPlayerStones();
            } else {
                this.gameInfoService.decrementAiStones();
            }
            this.hudService.updateGameInfo();
            this.gameService.state = new AiTurnState();
        }
    }

    public treatMouseUp(): void {
        this.treatMouseDown();
    }

    public treatMouseDown(): void {
        if (this.stoneIsBeyondLine()) {
            if (Cart.activeStone.getMesh().position.y > Settings.START_LINE_Y) {
                new SweepSound();
            }
            this.broomService.broom(this.gameService.mouse, this.renderService.getCamera());
            this.hudService.moveBroom();
        }
    }

    private stoneIsBeyondLine(): boolean {
        let position = Cart.activeStone.getMesh().position.y;
        return (position - Settings.STONE_RADIUS) > Settings.START_LINE_Y;
    }

}
