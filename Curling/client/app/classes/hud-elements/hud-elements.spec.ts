import { expect } from 'chai';

import { HudElements } from './hud-elements';
import { GameInfoService } from '../../services/game-info.service';

describe('HudElements', () => {

    let scene: THREE.Scene;
    let hudElements: HudElements;

    beforeEach(() => {
        let gameInfoService = new GameInfoService();
        scene = new THREE.Scene();
        hudElements = new HudElements(scene, gameInfoService);
    });

    it('power selection line should be initialized', () => {
        let element = hudElements.powerLine.getLine();
        let foundById = scene.getObjectById(element.id);
        let foundByName = scene.getObjectByName("powerLine");
        expect(foundById).to.equal(foundByName);
        expect(foundById).to.equal(element);
    });

    it('background for the power selection line should be initialized', () => {
        let foundByName = scene.getObjectByName("backgroundLine");
        expect(foundByName).not.to.be.undefined;
    });

    it('playerName should be created', () => {
        let element = hudElements.playerName.getText();
        expect(element).not.to.be.undefined;
    });

    it('cameraButton should be added to the scene', () => {
        let foundByName = scene.getObjectByName("cameraButton");
        expect(foundByName).not.to.be.undefined;
    });

    it('spinButton should be added to the scene', () => {
        let foundByName = scene.getObjectByName("spinButton");
        expect(foundByName).not.to.be.undefined;
    });

    it('three cursor should be created and initialized', () => {
        let foundByName = scene.getObjectByName("cursor");
        expect(foundByName).not.to.be.undefined;
    });

    it('power selection line should be between -225 and -225 on y', () => {
        let line = hudElements.powerLine;
        expect(line.getStart().y).to.equal(-225);
        expect(line.getEnd().y).to.equal(-225);
    });

});
