import { expect } from 'chai';

import { Color } from '../../classes/global/enums';
import { Settings } from '../../classes/global/settings';

import { HudService } from '../../services/hud.service';
import { CollisionService } from '../../services/collision.service';
import { GameInfoService } from '../../services/game-info.service';

import { Stone } from '../../classes/general/stone';
import { Cart } from '../../classes/general/cart';
import { StoneThrowingService } from '../stone-throwing.service';

describe('StoneThrowingService', () => {

    let service: StoneThrowingService;
    let scene: THREE.Scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        for (let i = 0; i < Settings.NUMBER_OF_STONES; i++) {
            Cart.playerStones.push(new Stone(scene, Color.BLUE, true));
            Cart.stones.push(Cart.playerStones[i]);

            Cart.aiStones.push(new Stone(scene, Color.RED, true));
            Cart.stones.push(Cart.aiStones[i]);
        }
        Cart.activeStone = Cart.playerStones[0];

        let gameInfoService = new GameInfoService();
        let hudService = new HudService(gameInfoService);
        let collisionService = new CollisionService();
        service = new StoneThrowingService(hudService, collisionService);
        service.init(scene);
    });

    it('the stones should be initialized correctly', () => {
        expect(Cart.stones.length).not.to.equal(0);
    });

    it('the spin should be clockwise by default', () => {
        expect(service.getSpinClockwise()).to.be.true;
    });

    it('toggleSpin should change the direction of the spin', () => {
        service.toggleSpin();
        expect(service.getSpinClockwise()).to.equal(false);
        service.toggleSpin();
        expect(service.getSpinClockwise()).to.equal(true);
    });

    it('throwActiveStone should toggle the line and move the stone', () => {
        let power = 5;
        service.throwActiveStone(power);
        expect(service.getIsAnyStoneMoving()).to.equal(true);
        expect(service.getLine().getLine().visible).to.equal(false);
    });

    it('the line should be initialized', () => {
        let line = scene.getObjectByName("trajectoryLine");
        expect(line).not.to.be.undefined;
    });

    it('trajectory line should start from (0, 0)', () => {
        expect(service.getLine().getStart().x).to.equal(0);
        expect(service.getLine().getStart().y).to.equal(0);
    });

    it('toggleLine should change its visibility', () => {
        service.toggleLine();
        expect(service.getLine().getLine().visible).to.equal(false);
        service.toggleLine();
        expect(service.getLine().getLine().visible).to.equal(true);
    });

    it('toggleLine should change its visibility', () => {
        service.toggleLine();
        expect(service.getLine().getLine().visible).to.equal(false);
        service.toggleLine();
        expect(service.getLine().getLine().visible).to.equal(true);
    });

    it('angle should not be more/less than +/-30°', () => {
        for (let x = 0.01; x < 1.01; x += 0.1) {
            let position = new THREE.Vector2(x, 0);
            service.updateLine(position);
            let end = service.getLine().getEnd();
            let angle = Math.atan(end.x / end.y);
            expect(angle >= -Settings.MAX_ANGLE).to.be.true;
            expect(angle <= Settings.MAX_ANGLE).to.be.true;
        }
    });

    it('line end x should be on the arena', () => {
        for (let x = 0.01; x < 1.01; x += 0.1) {
            let position = new THREE.Vector2(x, 0);
            service.updateLine(position);
            let endX = service.getLine().getEnd().x;
            expect(endX >= -Settings.HALF_ARENA_WIDTH).to.be.true;
            expect(endX <= Settings.HALF_ARENA_WIDTH).to.be.true;
        }
    });

    it('line end y should be <= arena length', () => {
        for (let x = 0.01; x < 1.01; x += 0.1) {
            let position = new THREE.Vector2(x, 0);
            service.updateLine(position);
            let y = service.getLine().getEnd().y;
            expect(y <= Settings.ARENA_LENGTH).to.be.true;
        }
    });

    it('line end y should be exactly arena length if mouse is centered', () => {
        let epsilon = 0.001;
        let position = new THREE.Vector2(0.5 + epsilon, 0);
        service.updateLine(position);
        let end = service.getLine().getEnd().clone();
        expect(Math.round(2 * end.y) / 2).to.equal(Settings.ARENA_LENGTH);
    });

    it('mouse y should not have any impact', () => {
        let position = new THREE.Vector2(0.6, 0);
        service.updateLine(position.clone());
        let firstValue = service.getLine().getEnd().clone();
        position.y = 6;
        service.updateLine(position);
        let secondValue = service.getLine().getEnd().clone();
        expect(firstValue.equals(secondValue)).to.be.true;
    });

});
