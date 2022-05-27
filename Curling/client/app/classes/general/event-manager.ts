import { appInjector } from '../../modules/app.module';

import { LeaveGame } from './leave-game';

import { RenderService } from '../../services/render.service';
import { StoneThrowingService } from '../../services/stone-throwing.service';
import { HudService } from '../../services/hud.service';
import { GameService } from '../../services/game.service';

import { Settings } from '../global/settings';

const SPACE_KEY_CODE = 32;
const I_KEY_CODE = 73;
const V_KEY_CODE = 86;
const S_KEY_CODE = 83;

export class EventManager {

    public renderService: RenderService;
    private stoneThrowingService: StoneThrowingService;
    private hudService: HudService;
    private gameService: GameService;
    private leaveGame: LeaveGame;

    constructor() {

        this.renderService = appInjector.get(RenderService);
        this.stoneThrowingService = appInjector.get(StoneThrowingService);
        this.hudService = appInjector.get(HudService);
        this.gameService = appInjector.get(GameService);

        this.leaveGame = new LeaveGame();

        window.addEventListener(
            'keydown',
            (e) => this.handleKeyDown(e.keyCode),
            false
        );

        window.addEventListener(
            'resize',
            this.resize.bind(this),
            false
        );

        window.addEventListener(
            'mousemove',
            (e) => this.handleMouseMove(e),
            false
        );

        this.renderService.renderer.domElement.addEventListener(
            'mousedown',
            (e) => this.handleMouseDown(e),
            false
        );

        this.renderService.renderer.domElement.addEventListener(
            'mouseup',
            (e) => this.handleMouseUp(e),
            false
        );

    }

    public resize(): void {
        let width = window.innerWidth;
        let height = window.innerHeight;
        if ((width / Settings.CANVAS_RATIO) < height) {
            this.renderService.renderer.setSize(width, width / Settings.CANVAS_RATIO);
        } else {
            this.renderService.renderer.setSize(height * Settings.CANVAS_RATIO, height);
        }
    }

    public handleKeyDown(keyCode: number): void {
        if (keyCode === V_KEY_CODE) {
            this.vKeyPressed();
        }
        else if (keyCode === I_KEY_CODE) {
            this.iKeyPressed();
        }
        else if (keyCode === S_KEY_CODE) {
            this.sKeyPressed();
        }
        else if (keyCode === SPACE_KEY_CODE) {
            this.spaceKeyPressed();
        }
    }

    public iKeyPressed(): void {
        this.hudService.toggleHelp();
    }

    public vKeyPressed(): void {
        this.renderService.getCamera().changeCamera();
    }

    public sKeyPressed(): void {
        this.stoneThrowingService.toggleSpin();
        let spinClockwise = this.stoneThrowingService.getSpinClockwise();
        this.hudService.setSpin(spinClockwise);
    }

    public replayPressed() {
        this.leaveGame.createNewGame();
    }

    public leavePressed() {
        this.leaveGame.exit();
    }

    public spaceKeyPressed(): void {
        this.gameService.treatSpaceKey();
    }

    public handleMouseMove(e: MouseEvent): void {
        let position = this.getMousePositionOnCanvas(e);
        this.stoneThrowingService.updateLine(position.clone());
        this.hudService.updateCursor(position.clone());
    }

    public handleMouseDown(e: MouseEvent): void {
        let position = this.getMousePositionOnCanvas(e);
        if (!this.hudService.isAnyButtonPressed(position.clone())) {
            this.gameService.treatMouseDown(position.clone());
        }
    }

    public handleMouseUp(e: MouseEvent): void {
        let position = this.getMousePositionOnCanvas(e);
        if (this.hudService.isPressedCameraButton(position.clone())) {
            this.vKeyPressed();
        } else if (this.hudService.isPressedSpinButton(position.clone())) {
            this.sKeyPressed();
        } else if (this.hudService.isPressedHelpButton(position.clone())) {
            this.iKeyPressed();
        } else if (this.hudService.isPressedReplayButton(position.clone())) {
            this.replayPressed();
        } else if (this.hudService.isPressedLeaveButton(position.clone())) {
            this.leavePressed();
        } else {
            this.gameService.treatMouseUp(position.clone());
        }
    }


    public getMousePositionOnCanvas(e: MouseEvent): THREE.Vector2 {
        let bounds = this.renderService.renderer.domElement.getBoundingClientRect();
        let xOffset = e.clientX - bounds.left;
        let yOffset = e.clientY - bounds.top;
        let width = bounds.right - bounds.left;
        let height = bounds.bottom - bounds.top;
        return new THREE.Vector2(xOffset / width, yOffset / height);
    }

}
