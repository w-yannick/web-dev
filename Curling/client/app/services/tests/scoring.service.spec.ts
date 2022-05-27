import { expect } from 'chai';

import { Color } from '../../classes/global/enums';

import { Stone } from '../../classes/general/stone';

import { ScoringService } from '../scoring.service';
import { Cart } from '../../classes/general/cart';

describe('PointingService', () => {

    let service = new ScoringService();
    let scene = new THREE.Scene();

    let stone = new Stone(scene, Color.BLUE, true);

    let stone1 = new Stone(scene, Color.RED, true);
    stone1.getMesh().position.x = 1.2;
    stone1.getMesh().position.y = 35;

    let stone2 = new Stone(scene, Color.BLUE, true);
    stone2.getMesh().position.x = 1;
    stone2.getMesh().position.y = 35;

    let stone3 = new Stone(scene, Color.RED, true);
    stone3.getMesh().position.x = 2;
    stone3.getMesh().position.y = 35;

    let stone4 = new Stone(scene, Color.BLUE, true);
    stone4.getMesh().position.x = 1.93;
    stone4.getMesh().position.y = 35;

    let stones = [stone1, stone2, stone3, stone4];

    it('stone in the center (0, 35): distance should be equal to 0', () => {
        stone.getMesh().position.x = 0;
        stone.getMesh().position.y = 35;
        expect(service.distanceToCenter(stone)).to.equal(0);
    });

    it('stone (0, 34) : distance should be equal to 1', () => {
        stone.getMesh().position.x = 0;
        stone.getMesh().position.y = 34;
        expect(service.distanceToCenter(stone)).to.equal(1);
    });

    it('stone (3, 31) : distance should be equal to 5', () => {
        stone.getMesh().position.x = 3;
        stone.getMesh().position.y = 31;
        expect(service.distanceToCenter(stone)).to.equal(5);
    });

    it('sort should sort the stones depending on their distance to the center', () => {
        service.sort(stones);
        expect(service.distanceToCenter(stones[0])).to.equal(1);
        expect(service.distanceToCenter(stones[1])).to.equal(1.2);
        expect(service.distanceToCenter(stones[2])).to.equal(1.93);
        expect(service.distanceToCenter(stones[3])).to.equal(2);
    });

    it('count points should correctly count the points for a given color', () => {
        Cart.stones = stones;
        expect(service.countPoints(Color.BLUE)).to.equal(1);
        expect(service.countPoints(Color.RED)).to.equal(0);
    });

    it('it should not count stones that are not in the house', () => {
        stone.getMesh().position.x = 0;
        stone.getMesh().position.y = 35;
        stone1.getMesh().position.x = 0;
        stone1.getMesh().position.y = 34;
        stone2.getMesh().position.x = 0;
        stone2.getMesh().position.y = 25;
        let stonesa = [stone1, stone, stone2];
        service.sort(stonesa);
        Cart.stones = stones;
        expect(service.countPoints(Color.RED)).to.equal(1);
    });

});
