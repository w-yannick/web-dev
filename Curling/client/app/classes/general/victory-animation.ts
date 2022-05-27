import { appInjector } from '../../modules/app.module';

import { Settings } from '../global/settings';

import { Particles } from '../general/particles';
import { Cart } from '../general/cart';
import { Stone } from '../general/stone';

import { HudService } from '../../services/hud.service';
import { GameInfoService } from '../../services/game-info.service';

export class VictoryAnimation {

    private scene: THREE.Scene;
    private particles: Particles;
    private jumpingDirection: number;
    private animationEnded: boolean;

    private hudService: HudService;
    private gameInfoService: GameInfoService;

    private clock = new THREE.Clock();
    private letAnimate: boolean;

    private textMaterial: THREE.MeshPhongMaterial = null;
    private mesh: THREE.Mesh;
    private textGeometry: THREE.TextGeometry;
    private isInit = false;

    public init(scene: THREE.Scene) {
        this.hudService = appInjector.get(HudService);
        this.gameInfoService = appInjector.get(GameInfoService);

        this.jumpingDirection = 1;
        this.scene = scene;
        this.particles = new Particles();
        this.isInit = true;
        this.animationEnded = false;
    }

    public reset() {
        this.isInit = true;
        this.animationEnded = false;
        this.scene.remove(this.mesh);
        this.particles.clean();
    }

    private animateStones() {
        let stones = this.getWinnerStones();
        for (let i = 0; i < stones.length; i++) {
            let positionZ = stones[i].getMesh().position.z;
            if (positionZ <= 0) {
                this.jumpingDirection = 1;
            }
            else if (positionZ >= Settings.STONE_JUMP_HEIGHT_MAX) {
                this.jumpingDirection = -1;
            }
            stones[i].getMesh().position.z += Settings.ANIMATION_VELOCITY * this.jumpingDirection;
        }
    }

    public getWinnerStones(): Stone[] {
        let aiScore = this.gameInfoService.getAiScore();
        let playerScore = this.gameInfoService.getPlayerScore();
        let stones: Stone[];
        if (aiScore < playerScore) {
            stones = Cart.playerStones;
        } else if (aiScore > playerScore) {
            stones = Cart.aiStones;
        } else {
            stones = Cart.stones;
        }
        return stones;
    }

    private initCongratulationsText() {
        let manager = new THREE.LoadingManager();
        let loader = new THREE.FontLoader(manager);
        let aiScore = this.gameInfoService.getAiScore();
        let playerScore = this.gameInfoService.getPlayerScore();
        let text: string;
        if (aiScore < playerScore) {
            text = "VICTOIRE";
        } else if (aiScore > playerScore) {
            text = "DEFAITE";
        } else {
            text = "MATCH NUL";
        }
        loader.load('../../assets/fonts/roboto_regular.json', (response) => {
            this.textGeometry = new THREE.TextGeometry(text, {
                curveSegments: 10,
                font: Object(response) as THREE.Font,
                size: 1,
                height: 0.5,
                bevelEnabled: false,
                bevelThickness: 2,
                bevelSize: 5
            });
            this.textMaterial = new THREE.MeshPhongMaterial({ color: 0x00FFFF });
            this.mesh = new THREE.Mesh(this.textGeometry, this.textMaterial);
            this.mesh.rotateX(Math.PI / 2);
            this.mesh.position.set(-3, 40, 0.1);
            this.scene.add(this.mesh);
        });
    }

    public enableAnimation(isEnable: boolean) {
        this.initCongratulationsText();
        this.letAnimate = isEnable;
        if (this.letAnimate && this.isInit) {
            this.clock.start();

            let aiScore = this.gameInfoService.getAiScore();
            let playerScore = this.gameInfoService.getPlayerScore();
            if (aiScore < playerScore) {
                this.particles.init(this.scene);
            }
        }
    }

    public animate() {
        if (this.letAnimate) {
            if (this.clock.getElapsedTime() < Settings.ANIMATION_TIME / 1000) {
                this.animateStones();
            }
            else {
                this.scene.remove(this.mesh);
                this.animationEnded = true;

                this.clock.stop();
                this.clock.oldTime = 0;
                this.letAnimate = false;
                let stones = this.getWinnerStones();
                for (let i = 0; i < stones.length; i++) {
                    stones[i].getMesh().position.z = 0;
                }
                this.hudService.addScoreTableAndTopScores();
            }
        }
    }

    public getAnimationEnded() {
        return this.animationEnded;
    }

}
