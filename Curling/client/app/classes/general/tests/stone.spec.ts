import { expect } from 'chai';

import { Color } from '../../global/enums';

import { Stone } from '../stone';

describe('Stone', () => {

    let scene: THREE.Scene;
    let stone: Stone;
    let direction = new THREE.Vector2(1, 1);

    beforeEach(() => {
        scene = new THREE.Scene();
        stone = new Stone(scene, Color.BLUE, true);
    });

    it('stone should not be moving by default', () => {
        expect(stone.getIsMoving()).to.equal(true);
    });

    it('startMovement should move stone', () => {
        stone.startMovement(2, direction, 1);
        expect(stone.getIsMoving()).to.equal(true);
    });

    it('isOffside()', () => {
        stone.getMesh().position.set(1000, 1000, 1000);
        expect(stone.isOffside()).to.equal(true);
    });

    it('reset stone should reset all the stone parameters', () => {
        stone.getMesh().position.set(1000, 1000, 1000);
        stone.resetStone();
        expect(stone.getSpeed()).to.equal(0);
        expect(stone.getAngularSpeed()).to.equal(0);
        expect(stone.getMesh().position.x).to.equal(0);
        expect(stone.getMesh().position.y).to.equal(0);
        expect(stone.getMesh().position.z).to.equal(0);
    });

    it('setDirection Direction', () => {
        stone.setDirection(direction);
        expect(stone.getDirection()).to.equal(direction);
    });

    it('getSpeed et setspeed', () => {
        stone.setSpeed(1);
        expect(stone.getSpeed()).to.equal(1);
    });

    it('getColor', () => {
        expect(stone.getColor()).to.equal(Color.BLUE);
    });

    it('setAngularSpeed et getAngularSpeed', () => {
        stone.setAngularSpeed(3);
        expect(stone.getAngularSpeed()).to.equal(3);
    });

});

