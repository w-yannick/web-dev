import { expect } from 'chai';

import { Color } from '../../global/enums';

import { Stone } from '../stone';
import { SpinCalculator } from '../spin-calculator';

describe('SpinCalculator', () => {

    let spinCalculator: SpinCalculator;
    let scene = new THREE.Scene();
    let stone = new Stone(scene, Color.BLUE, true);

    beforeEach(() => {
        spinCalculator = new SpinCalculator(stone);
    });

    it('boundAngularSpeed should return 0 if the angular speed sign just changed', () => {
        let angularSpeed = spinCalculator.boundAngularSpeed(2, -2);
        expect(angularSpeed).to.equal(0);
        angularSpeed = spinCalculator.boundAngularSpeed(-2, 2);
        expect(angularSpeed).to.equal(0);
    });

    it('boundAngularSpeed should not change the speed if its sign didn t change', () => {
        let angularSpeed = spinCalculator.boundAngularSpeed(2, 6);
        expect(angularSpeed).to.equal(6);
        angularSpeed = spinCalculator.boundAngularSpeed(-2, -6);
        expect(angularSpeed).to.equal(-6);
    });

    it('applySpinDeviation should rotate the direction of the stone', () => {
        stone.setDirection(new THREE.Vector2(1, 0));
        let angle = 2000 * Math.PI;
        stone.getDirection().set(0, 1);
        spinCalculator.applySpinDeviation(angle);

        let vector = new THREE.Vector2(0, -1);
        stone.getDirection().x = Math.round(1000 * stone.getDirection().x) / 1000; // pour arrondir au 1000è
        stone.getDirection().y = Math.round(1000 * stone.getDirection().y) / 1000; // pour arrondir au 1000è
        expect(vector.equals(stone.getDirection())).to.be.true;
    });

    it('spin should rotate the stone correctly', () => {
        stone.setAngularSpeed(Math.PI);
        stone.setDirection(new THREE.Vector2(1, 0));
        stone.getMesh().position.set(0, 0, 0);
        let angle = stone.getAngularSpeed() / 60;
        stone.getMesh().rotateZ(angle);
        let rotation = stone.getMesh().rotation.toVector3();
        rotation.z = Math.round(rotation.z * 1000) / 1000; // pour arrondir au 1000è
        let vector = new THREE.Vector3(0, 0, 0.052);
        expect(rotation.equals(vector)).to.be.true;
    });

});
