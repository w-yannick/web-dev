import { Injectable } from '@angular/core';

import { Color } from '../classes/global/enums';
import { Settings } from '../classes/global/settings';

import { Cart } from '../classes/general/cart';
import { Stone } from '../classes/general/stone';

@Injectable()
export class ScoringService {

    public distanceToCenter(stone: Stone): number {
        let position = stone.getMesh().position;
        let center = new THREE.Vector3(0, 35, 0);
        return position.distanceTo(center);
    }

    public isInHouse(stone: Stone): boolean {
        let maxDistance = Settings.HOUSE_RADIUS + Settings.STONE_RADIUS;
        maxDistance -= 0.03; // rayon de la pierre != rayon du plancher de la pierre
        return (this.distanceToCenter(stone) <= maxDistance);
    }

    public sort(stones: Stone[]): void {
        stones.sort((a, b) => {
            let aDist = this.distanceToCenter(a);
            let bDist = this.distanceToCenter(b);
            return aDist - bDist;
        });
    }

    public countPoints(color: Color): number {
        let i = 0;
        let points = 0;
        let stones = Cart.stones.slice();
        this.sort(stones);
        while ((stones[i].getColor() === color) && this.isInHouse(stones[i++])) {
            points++;
        }
        return points;
    }

}
