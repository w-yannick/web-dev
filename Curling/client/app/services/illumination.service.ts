import { Injectable } from '@angular/core';

import { Settings } from '../classes/global/settings';

import { ScoringService } from './scoring.service';
import { StoneThrowingService } from './stone-throwing.service';

import { Stone } from '../classes/general/stone';
import { Cart } from '../classes/general/cart';

@Injectable()
export class IlluminationService {

    private lights = new Array<THREE.SpotLight>();
    private isIlluminated = false;

    constructor(
        private scoringService: ScoringService,
        private stoneThrowingService: StoneThrowingService
    ) {

    }

    public init(scene: THREE.Scene) {
        this.lights = new Array<THREE.SpotLight>(Settings.NUMBER_OF_STONES);
        for (let i = 0; i < this.lights.length; i++) {
            this.lights[i] = new THREE.SpotLight(0xffffff, 4);
            this.lights[i].angle = 0.5;
            scene.add(this.lights[i]);
        }
        setInterval(this.check.bind(this), 500);
    }

    private check(): void {
        if (this.stoneThrowingService.getIsAnyStoneMoving() === this.isIlluminated) {
            if (this.isIlluminated) {
                this.stop();
            } else {
                this.selectStones();
            }
        }
    }

    public stop(): void {
        for (let i = 0; i < this.lights.length; i++) {
            this.lights[i].visible = false;
        }
        this.isIlluminated = false;
    }

    public illuminate(stone: Stone): void {
        let light = this.lights.find((elem) => {
            return elem.visible === false;
        });
        this.updateLightPosition(light, stone);
        light.visible = true;
    }

    public selectStones() {
        let stones = Cart.stones;
        this.scoringService.sort(stones);

        let rightColor = function (stone: Stone) {
            let winningColor = stones[0].getColor();
            return stone.getColor() === winningColor;
        };
        for (let i = 0; rightColor(stones[i]) && this.scoringService.isInHouse(stones[i]); i++) {
            this.illuminate(stones[i]);
        }
        this.isIlluminated = true;
    }

    public updateLightPosition(light: THREE.SpotLight, stone: Stone) {
        let position = stone.getMesh().position;
        light.position.set(position.x, position.y, 0.3);
        light.target.position.set(position.x, position.y, 0);
        light.target.updateMatrixWorld(true);
    }

    public getIsIlluminated() {
        return this.isIlluminated;
    }

}
