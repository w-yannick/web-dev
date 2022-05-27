import { Stone } from './stone';
import { Settings } from '../global/settings';

export class SpinCalculator {

    private stone: Stone;

    constructor(stone: Stone) {
        this.stone = stone;
    }

    public getAngularSpeed(): number {
        return this.stone.getAngularSpeed();
    }

    public getDirection(): THREE.Vector2 {
        return this.stone.getDirection();
    }

    public getMesh() {
        return this.stone.getMesh();
    }

    public spin(): void {
        let angularAcceleration = this.calculateAngularAcceleration();
        let previousSpeed = this.getAngularSpeed();
        let angularSpeed = previousSpeed + angularAcceleration * Settings.FRAME_PERIOD;
        angularSpeed = this.boundAngularSpeed(previousSpeed, angularSpeed);
        this.stone.setAngularSpeed(angularSpeed);

        let angle = angularSpeed * Settings.FRAME_PERIOD;
        this.getMesh().rotateZ(angle);

        this.applySpinDeviation(-angle * Settings.BROOM_FRICTION_FACTOR); // règle de la main droite
    }

    public calculateAngularAcceleration(): number {
        // T = I.alpha <=> r.F = m.r².alpha <=> r.u.g.m = m.r².alpha <=> alpha = u.g / r
        let angularAcceleration = this.stone.calculateFriction() * Settings.G / Settings.STONE_RADIUS;
        if (this.getAngularSpeed() < 0) {
            angularAcceleration = angularAcceleration * -1; // règle de la main droite
        }
        // we must adjust the theorical value to take into account the complex
        // physics phenomena that take place (e.g. friction being superior at
        // the back of the stone thanks to the thin layer of water etc.)
        const ADJUSTMENT_FACTOR = 0.1;
        angularAcceleration *= ADJUSTMENT_FACTOR;
        return angularAcceleration;
    }

    public boundAngularSpeed(previous: number, current: number): number {
        if (previous > 0 && current < 0) {
            return 0;
        }
        if (previous < 0 && current > 0) {
            return 0;
        }
        return current;
    }

    public applySpinDeviation(angle: number): void {
        // friction force exerted on the front (FF) > friction force exerted on the back
        // thanks to the thin layer of water. Therefore, the rotation will slightly tend
        // to rotate the direction around the center of the stone.
        const DEVIATION_FACTOR = 1 / 2000;
        let position = this.getMesh().position;
        let center = new THREE.Vector2(position.x, position.y);
        this.getDirection().rotateAround(center, angle * DEVIATION_FACTOR);
    }

}
