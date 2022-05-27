import { Settings } from '../global/settings';
import { Difficulty, Color } from '../global/enums';

import { Cart } from './cart';

import { GameInfoService } from '../../services/game-info.service';
import { ScoringService } from '../../services/scoring.service';

export class AiLogic {

    private gameInfoService: GameInfoService;
    private scoringService: ScoringService;

    private power: number;
    private direction: THREE.Vector2 = new THREE.Vector2();

    constructor(gameInfoService: GameInfoService, scoringService: ScoringService) {
        this.gameInfoService = gameInfoService;
        this.scoringService = scoringService;
    }

    public throwStone(): void {
        if (this.gameInfoService.getDifficulty() === Difficulty.EASY) {
            this.power = (Math.random() * 0.3) + 2.5;
            this.randomizeDirection();
        }
        else {
            this.power = (Math.random() * 0.02) + 2.61;
            if (this.shouldTryToEjectOpponent()) {
                this.ejectOpponent();
            } else {
                this.randomizeDirection();
            }
        }
        let angularSpeed = Math.PI;
        if (this.direction.x <= 0) {
            angularSpeed = -angularSpeed;
        }
        Cart.activeStone.startMovement(this.power, this.direction.clone(), angularSpeed);
    }

    public randomizeDirection(): void {
        let x = Math.random();
        let y = 20;
        if (this.gameInfoService.getDifficulty() === Difficulty.EASY) {
            x = (x * 2) - 1;
        }
        else {
            x = (x * 0.3) - 0.15;
        }
        this.direction.set(x, y).normalize();
    }

    public shouldTryToEjectOpponent(): boolean {
        let sortedStones = Cart.stones;
        this.scoringService.sort(sortedStones);

        let bestIsInHouse = this.scoringService.isInHouse(sortedStones[0]);
        let bestIsHuman = sortedStones[0].getColor() === Color.BLUE;
        let isNotFirstRound = this.gameInfoService.getAiStones() < (Settings.NUMBER_OF_STONES - 1);
        let areEnoughStones = this.gameInfoService.getAiStones() > 2;

        return (bestIsInHouse && bestIsHuman && isNotFirstRound && areEnoughStones);
    }

    public ejectOpponent() {
        let sortedStones = Cart.stones;
        this.scoringService.sort(sortedStones);

        let x = sortedStones[0].getMesh().position.x;
        let y = sortedStones[0].getMesh().position.y;

        x = this.adjustDirection(x);
        this.direction.set(x, y).normalize();

        this.setPower(3);
    }

    public adjustDirection(x: number): number {
        return (x > 0) ? (x + 0.1) : (x - 0.1);
    }

    public getPower(): number {
        return this.power;
    }

    public setPower(power: number): void {
        this.power = power;
    }

}
