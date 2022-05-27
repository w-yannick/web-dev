import { CollisionService } from '../collision.service';
import { Stone } from '../../classes/general/stone';
import { Color } from '../../classes/global/enums';
import { expect } from 'chai';

describe('CollisionService', () => {

    let collisionService: CollisionService;
    let scene: THREE.Scene;

    beforeEach(() => {
        collisionService = new CollisionService();
        scene = new THREE.Scene();
    });

    it('should detect no collision', () => {
        let stone = new Stone(scene, Color.BLUE, true);
        expect(collisionService.detectCollision(stone)).to.equal(undefined);
    });

});
