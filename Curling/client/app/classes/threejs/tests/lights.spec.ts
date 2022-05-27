import { expect } from 'chai';

import { Lights } from '../lights';

describe('Light', () => {

    let light: Lights;
    let scene: THREE.Scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        light = new Lights(scene);
    });

    it('ambiant light should be added to the scene', () => {
        let object = scene.getObjectByName("ambientLight");
        expect(object).not.to.be.undefined;
    });

    it('spot light should be added to the scene', () => {
        let object = scene.getObjectByName("spotLight0");
        expect(object).not.to.be.undefined;
    });

    it('lights should have the right position and direction', () => {
        let spotLight = scene.getObjectByName("spotLight0") as THREE.SpotLight;

        let expectedPosition = new THREE.Vector3(0, 0, 3);
        expect(spotLight.position.equals(expectedPosition)).to.be.true;

        let expectedDirection = new THREE.Vector3(0, 0, 0);
        expect(spotLight.target.position.equals(expectedDirection)).to.be.true;

    });

    it('spot light angle should be 90°', () => {
        let spotLight = scene.getObjectByName("spotLight0") as THREE.SpotLight;

        let expectedAngle = Math.PI / 2;
        expect(spotLight.angle).to.equal(expectedAngle);
    });

    it('decay should be realist according to THREE.js doc', () => {
        let spotLight = scene.getObjectByName("spotLight0") as THREE.SpotLight;

        let isRealist = spotLight.decay <= 3;
        isRealist = isRealist && spotLight.decay >= 1;
        expect(isRealist).to.be.true;
    });

});
