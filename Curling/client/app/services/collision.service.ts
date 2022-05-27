import { Injectable } from '@angular/core';

import { Settings } from '../classes/global/settings';

import { Cart } from '../classes/general/cart';
import { Stone } from '../classes/general/stone';

import { CollisionSound } from '../classes/sounds/collision-sound';

@Injectable()
export class CollisionService {

    private stones: Stone[] = [];

    public treatCollisions(): void {

        this.stones = new Array<Stone>();

        Cart.stones.forEach((elem) => {
            if (elem.getMesh().visible) {
                this.stones.push(elem);
            }
        });

        for (let stone of this.stones) {
            let collided = this.detectCollision(stone);
            if (collided !== undefined) {
                let speedVectors = this.calculateVelocity(stone, collided);
                this.updateSpeed(stone, speedVectors[0]);
                this.updateSpeed(collided, speedVectors[1]);
                this.updateDirection(stone, speedVectors[0]);
                this.updateDirection(collided, speedVectors[1]);
                this.separateStones(stone, collided);
                this.stones.splice(this.stones.findIndex((elem) => elem === stone));
                this.stones.splice(this.stones.findIndex((elem) => elem === collided));
            }
        }
    }

    public detectCollision(stone: Stone): Stone {
        let first = stone.getMesh().position;
        for (let secondStone of this.stones) {
            if (secondStone !== stone) {
                let second = secondStone.getMesh().position;
                let distance = first.distanceTo(second);
                if (distance < 2 * Settings.STONE_RADIUS) {
                    if (first.y !== 0 || second.y !== 0) {
                        this.createSound([stone, secondStone]);
                        return secondStone;
                    }
                }
            }
        }
        return undefined;
    }

    private calculateVolume(stones: Stone[]): number {
        const MAX_SPEED = Settings.INITIAL_SPEED * Settings.INITIAL_SPEED_FACTOR_RANGE[1];
        let speeds = new Array<THREE.Vector2>();
        for (let i = 0; i < 2; i++) {
            speeds.push(this.calculateSpeed(stones[i]));
        }
        let relativeSpeed = (speeds[0].sub(speeds[1])).length();
        return Math.min(relativeSpeed / MAX_SPEED, 1);
    }

    private calculateSpeed(stone: Stone): THREE.Vector2 {
        let direction = stone.getDirection().clone();
        return direction.multiplyScalar(stone.getSpeed());
    }

    private createSound(stones: Stone[]): void {
        let sound = new CollisionSound();
        let volume = this.calculateVolume(stones);
        sound.setVolume(volume);
    }

    public calculateVelocity(stone1: Stone, stone2: Stone): THREE.Vector2[] {
        // pris de : http://www.lucidarme.me/?p=2582

        let x1 = stone1.getMesh().position.x;
        let x2 = stone2.getMesh().position.x;
        let y1 = stone1.getMesh().position.y;
        let y2 = stone2.getMesh().position.y;

        let u1 = stone1.getSpeed();
        let u2 = stone2.getSpeed();

        // calcul des alpha
        let a1 = Math.atan2(y2 - y1, x2 - x1);
        let a2 = Math.atan2(y1 - y2, x1 - x2);

        // calcul des composantes des vecteurs u
        let xu1 = stone1.getSpeed() * stone1.getDirection().x;
        let yu1 = stone1.getSpeed() * stone1.getDirection().y;

        let xu2 = stone2.getSpeed() * stone2.getDirection().x;
        let yu2 = stone2.getSpeed() * stone2.getDirection().y;

        // calcul des beta
        let b1 = Math.atan2(yu1, xu1);
        let b2 = Math.atan2(yu2, xu2);

        // calcul des gamma
        let gamma1 = b1 - a1;
        let gamma2 = b2 - a2;

        // calcul des u
        let u12 = u1 * Math.cos(gamma1);
        let u11 = u1 * Math.sin(gamma1);
        let u21 = u2 * Math.cos(gamma2);
        let u22 = u2 * Math.sin(gamma2);

        // calcul des v
        let v12 = -u21;
        let v21 = u12;

        // calcul des v1x, v1y, v2x, v2y
        let v1x = (u11 * (-Math.sin(a1))) + (v12 * (Math.cos(a1)));
        let v1y = (u11 * (Math.cos(a1))) + (v12 * (Math.sin(a1)));
        let v2x = (u22 * (-Math.sin(a2))) - (v21 * (Math.cos(a2)));
        let v2y = (u22 * (Math.cos(a2))) - (v21 * (Math.sin(a2)));

        // calcul final
        let v1 = new THREE.Vector2(v1x, v1y);
        let v2 = new THREE.Vector2(v2x, v2y);

        return [v1, v2];
    }

    public updateSpeed(stone: Stone, speedVector: THREE.Vector2): void {
        stone.setSpeed(speedVector.length());
    }

    public updateDirection(stone: Stone, speedVector: THREE.Vector2): void {
        stone.setDirection(speedVector.clone().normalize());
    }

    public separateStones(stone1: Stone, stone2: Stone) {
        let position1 = stone1.getMesh().position.clone();
        let position2 = stone2.getMesh().position;
        let distanceVector = position1.sub(position2);
        let newDistance = 2 * Settings.STONE_RADIUS;
        let relativePosition = distanceVector.normalize().multiplyScalar(newDistance);
        let x = position2.x + relativePosition.x;
        let y = position2.y + relativePosition.y;
        stone1.getMesh().position.set(x, y, 0);
    }

}
