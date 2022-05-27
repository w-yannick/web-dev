import { expect } from 'chai';

import { Camera } from './camera';

describe('Camera', () => {

    let camera: Camera;
    let scene: THREE.Scene;
    let meshPosition: THREE.Vector3;

    beforeEach(() => {
        scene = new THREE.Scene();
        camera = new Camera(scene);
        let mesh = new THREE.Mesh();
        meshPosition = new THREE.Vector3(10, 20, 30);
        mesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
        camera.followObject(mesh);
    });

    it('top camera should be deactivated by default', () => {
        expect(camera.getCamera()).not.to.equal(camera.getTopCamera());
    });

    it('pressing v once should deactivate/reactivate top view', () => {
        camera.changeCamera();
        expect(camera.getCamera()).to.equal(camera.getTopCamera());
        camera.changeCamera();
        expect(camera.getCamera()).not.to.equal(camera.getTopCamera());
    });

    it('camera should correctly follow the trajectory of the targeted mesh', () => {
        let expectedPosition = new THREE.Vector3(0, meshPosition.y - 4, 1);
        expect(camera.getCamera().position.equals(expectedPosition)).to.be.true;
    });

    it('camera should look at the target', () => {
        let direction = camera.getCamera().getWorldDirection();
        camera.getCamera().lookAt(new THREE.Vector3(0, meshPosition.y, 0));
        let expectedDirection = camera.getCamera().getWorldDirection();
        expect(direction.equals(expectedDirection)).to.be.true;
    });

    it('top camera should not follow the target', () => {
        camera.changeCamera();
        let expectedPosition = new THREE.Vector3(0, meshPosition.y - 5, 2);
        expect(camera.getCamera().position.equals(expectedPosition)).to.be.false;
    });

    it('top camera should not look at the target', () => {
        camera.changeCamera();
        let direction = camera.getCamera().getWorldDirection();
        camera.getCamera().lookAt(new THREE.Vector3(0, meshPosition.y, 0));
        let expectedDirection = camera.getCamera().getWorldDirection();
        expect(direction.equals(expectedDirection)).to.be.false;
    });

});
