import { expect } from 'chai';

import { Settings } from '../../classes/global/settings';

import { HudService } from '../hud.service';
import { GameInfoService } from '../game-info.service';

describe('HudService', () => {

    let hudService: HudService;

    beforeEach(() => {
        let gameInfoService = new GameInfoService();
        hudService = new HudService(gameInfoService);
        hudService.init();
        hudService.getScene().updateMatrixWorld(true); // to get intersections without any renderer
    });

    it('camera should be at (0, 0, 10) by default', () => {
        let camera = hudService.getCamera();
        let expectedPosition = new THREE.Vector3(0, 0, 10);
        expect(camera.position.equals(expectedPosition)).to.be.true;
    });

    it('should convert left:0 < x < 1:right to left:-0.5 < x < 0.5:right', () => {
        let xValues = [0, 0.25, 0.5, 0.75, 1];
        xValues.forEach((x, index) => {
            let position = new THREE.Vector2(x, 100);
            hudService.changeToHudCoordinates(position);
            xValues[index] = position.x;
        });
        let expectedXValues = [-0.5, -0.25, 0, 0.25, 0.5];
        for (let i = 0; i < expectedXValues.length; i++) {
            expect(expectedXValues[i] * Settings.HUD_WIDTH).to.be.equal(xValues[i]);
        }
    });

    it('should convert top:0 < y < 1:bot to bot:-0.5 < y < 0.5:top', () => {
        let yValues = [0, 0.25, 0.5, 0.75, 1];
        yValues.forEach((y, index) => {
            let position = new THREE.Vector2(100, y);
            hudService.changeToHudCoordinates(position);
            yValues[index] = position.y;
        });
        let expectedYValues = [0.5, 0.25, 0, -0.25, -0.5];
        for (let i = 0; i < expectedYValues.length; i++) {
            expect(expectedYValues[i] * Settings.HUD_HEIGHT).to.be.equal(yValues[i]);
        }
    });

    it('updateCursor should follow the position', () => {
        let position = new THREE.Vector2(0.25, 0.25);
        hudService.updateCursor(position);

        let cursor = hudService.getScene().getObjectByName("cursor");
        let expectedPosition = new THREE.Vector3(-225, 132.5);

        expect(cursor.position.x).to.equal(expectedPosition.x);
        expect(cursor.position.y).to.equal(expectedPosition.y);
    });

    it('should tell if the camera button is pressed', () => {
        let position = new THREE.Vector2(0.05, 0.1);
        expect(hudService.isPressedCameraButton(position)).to.equal(true);
    });

    it('should tell when the camera button is not pressed', () => {
        let position = new THREE.Vector2(0, 0);
        expect(hudService.isPressedCameraButton(position)).to.equal(false);
    });

    it('should tell if the spin button is pressed', () => {
        let position = new THREE.Vector2(0.05, 0.25);
        expect(hudService.isPressedSpinButton(position)).to.equal(true);
    });

    it('should tell when the spin button is not pressed', () => {
        let position = new THREE.Vector2(0, 0);
        expect(hudService.isPressedSpinButton(position)).to.equal(false);
    });

    it('should tell when the raycaster does not meet anything', () => {
        let position = new THREE.Vector2(-1000, -1000);
        expect(hudService.getClickedObjects(position).length).to.equal(0);
    });

    it('should correctly tell when the raycaster does meet something', () => {
        let position = new THREE.Vector2(-400, 200);
        expect(hudService.getClickedObjects(position).length > 0).to.be.true;
    });

});
