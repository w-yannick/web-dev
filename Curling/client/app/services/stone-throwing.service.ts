import { Injectable } from '@angular/core';

import { Cart } from '../classes/general/cart';

import { TrajectoryLine } from '../classes/threejs/lines/trajectory-line';
import { Line } from '../classes/threejs/lines/line';

import { Settings } from '../classes/global/settings';
import { CollisionService } from '../services/collision.service';
import { HudService } from '../services/hud.service';


import { Cursor } from '../classes/global/enums';
import { Color } from '../classes/global/enums';

@Injectable()
export class StoneThrowingService {

    private line: Line;
    private direction: THREE.Vector2;
    public tingleState: number;
    private spinClockwise: boolean;

    constructor(
        private hudService: HudService,
        private collisionService: CollisionService
    ) {
        this.spinClockwise = true;
        this.tingleState = 0;
        this.direction = new THREE.Vector2(0, 1);
    }

    public init(scene: THREE.Scene): void {
        this.line = new TrajectoryLine(scene);
        setInterval(this.tingle.bind(this), 50);
    }

    public updateLine(position: THREE.Vector2): void {
        position.x -= 0.5;
        const MAX_X = Settings.ARENA_LENGTH * Math.tan(Settings.MAX_ANGLE);

        let x = position.x * 2 * MAX_X;
        let boundedX = Math.min(Math.max(x, -Settings.HALF_ARENA_WIDTH), Settings.HALF_ARENA_WIDTH);
        let y = Settings.ARENA_LENGTH;
        let boundedY = y;
        if (x !== 0) {
            boundedY *= boundedX / x; // théorème de Thalès
        }
        this.line.setEnd(new THREE.Vector3(
            boundedX,
            boundedY,
            0.01
        ));

        this.line.updateLineEnd();

        this.direction.set(x, y).normalize();
    }

    public tingle(): void {
        const DASH_CYCLE_SIZE = 1;
        const NUMBER_OF_STATES = 20;
        let offset = DASH_CYCLE_SIZE * this.tingleState / NUMBER_OF_STATES;
        this.tingleState = ++this.tingleState % NUMBER_OF_STATES;
        let angle = Math.atan(this.direction.x / this.direction.y);
        this.line.getStart().x = Math.sin(angle) * offset;
        this.line.getStart().y = Math.cos(angle) * offset;
        this.line.updateLineStart();
    }

    public throwActiveStone(power: number): void {
        let angularSpeed = 1 * Math.PI;
        if (this.spinClockwise) {
            angularSpeed = -angularSpeed;
        }
        Cart.activeStone.startMovement(power, this.direction.clone(), angularSpeed);
        this.toggleLine();
    }

    public update(): void {
        for (let i = 0; i < 2 * Settings.NUMBER_OF_STONES; i++) {
            if (Cart.stones[i] === Cart.activeStone) {
                if (Cart.activeStone.getIsMoving()) {
                    Cart.stones[i].slide();
                }
            }
            else if (Cart.stones[i].getMesh().visible) {
                Cart.stones[i].slide();
            }
        }
        if ((Cart.activeStone.getMesh().position.y - Settings.STONE_RADIUS) > Settings.START_LINE_Y) {
            if (Cart.activeStone.getColor() === Color.BLUE) {
                this.hudService.setCursor(Cursor.GREEN_BROOM);
            }
        }

        this.collisionService.treatCollisions();
    }

    public getIsAnyStoneMoving(): boolean {
        for (let i = 0; i < 2 * Settings.NUMBER_OF_STONES; i++) {
            if (Cart.stones[i].getIsMoving()) {
                return true;
            }
        }
        return false;
    }

    public toggleLine(): void {
        this.line.getLine().visible = !this.line.getLine().visible;
    }

    public toggleSpin(): void {
        this.spinClockwise = !this.spinClockwise;
    }

    public getLine(): Line {
        return this.line;
    }

    public getSpinClockwise(): boolean {
        return this.spinClockwise;
    }

}
