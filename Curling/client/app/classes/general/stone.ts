import { appInjector } from '../../modules/app.module';

import { GlidingSound } from '../sounds/gliding-sound';

import { BroomService } from '../../services/broom.service';

import { Settings } from '../global/settings';
import { Color } from '../global/enums';

import { SpinCalculator } from './spin-calculator';

import { GlObject } from '../threejs/gl-object';

export class Stone extends GlObject {

    private static glidingSound = new GlidingSound();

    private speed: number;
    private direction: THREE.Vector2;
    private color: Color;
    private angularSpeed: number;
    private spinCalculator: SpinCalculator;
    private broomService: BroomService;

    constructor(scene: THREE.Scene, color: Color, isInvisible = false) {
        if (isInvisible) {
            super(true);
            this.color = color;
            return;
        }
        super();
        this.color = color;
        let model;
        if (color === Color.BLUE) {
            model = '/assets/models/blue_stone.dae';
        } else {
            model = '/assets/models/red_stone.dae';
        }
        this.direction = new THREE.Vector2;
        this.speed = 0;
        this.angularSpeed = 0;
        this.init(scene, model, false);
        this.spinCalculator = new SpinCalculator(this);
        this.broomService = appInjector.get(BroomService);
    }

    public startMovement(power: number, direction: THREE.Vector2, angularSpeed: number): void {
        this.direction = direction;
        this.speed = Settings.INITIAL_SPEED * power;
        this.angularSpeed = angularSpeed;
    }

    public slide(): void {
        let distance = this.calculateDistance();
        this.incrementPosition(distance);
        this.spinCalculator.spin();
        if (this.isOffside()) {
            this.speed = 0;
            this.resetStone();
        }
        this.updateVolume();
    }

    private updateVolume() {
        const MAX_SPEED = Settings.INITIAL_SPEED * Settings.INITIAL_SPEED_FACTOR_RANGE[1];
        let volume = Math.pow(this.speed / MAX_SPEED, 0.7); // root makes the modelisation more accurate
        Stone.glidingSound.setVolume(volume);
    }

    public calculateDistance(): number {
        let friction = this.calculateFriction();
        let acceleration = friction * Settings.G;
        this.speed += acceleration * Settings.FRAME_PERIOD;
        if (this.speed <= 0) {
            this.speed = 0;
        }
        return this.speed * Settings.FRAME_PERIOD;
    }

    public calculateFriction(): number {
        let friction = Settings.FRICTION;
        let position = this.mesh.position;
        let point = new THREE.Vector2(position.x, position.y);
        if (this.broomService.isBroomed(point)) {
            friction *= Settings.BROOM_FRICTION_FACTOR;
        }
        return friction;
    }

    public incrementPosition(distance: number): void {
        let offSet = this.direction.clone().multiplyScalar(distance);
        this.mesh.position.x += offSet.x;
        this.mesh.position.y += offSet.y;
    }

    public isOffside(): boolean {
        let isOffsideRight = this.mesh.position.x > (Settings.HALF_ARENA_WIDTH - Settings.STONE_RADIUS);
        let isOffsideLeft = this.mesh.position.x < (-Settings.HALF_ARENA_WIDTH + Settings.STONE_RADIUS);
        let isOffsideTop = this.mesh.position.y > (Settings.ARENA_LENGTH + Settings.STONE_RADIUS);

        return (isOffsideRight || isOffsideLeft || isOffsideTop);
    }

    public resetStone(): void {
        this.mesh.visible = false;
        this.speed = 0;
        this.angularSpeed = 0;
        this.mesh.position.set(0, 0, 0);
    }

    public getIsMoving(): boolean {
        return (this.speed !== 0);
    }

    public getDirection(): THREE.Vector2 {
        return this.direction;
    }

    public setDirection(direction: THREE.Vector2): void {
        this.direction = direction;
    }

    public getSpeed(): number {
        return this.speed;
    }

    public setSpeed(speed: number): void {
        this.speed = speed;
    }

    public getColor(): Color {
        return this.color;
    }

    public getAngularSpeed(): number {
        return this.angularSpeed;
    }

    public setAngularSpeed(angularSpeed: number): void {
        this.angularSpeed = angularSpeed;
    }

}
