import { GameInfoService } from '../../services/game-info.service';

import { PowerLine } from '../threejs/lines/power-line';
import { PowerLineBackground } from '../threejs/lines/power-line-background';

import { RobotoText } from '../texts/roboto-text';

import { Settings } from '../global/settings';
import { Difficulty } from '../global/enums';

import { CursorsMaker } from './cursors-maker';

export class HudElements {

    private scene: THREE.Scene;
    private gameInfoService: GameInfoService;

    public powerLine: PowerLine;

    public playerScore: RobotoText;
    public aiScore: RobotoText;
    public playerName: RobotoText;
    public scoreTable: THREE.Mesh;
    public topScores: RobotoText[];

    public tips: RobotoText[];
    public tipsBackground: THREE.Mesh;

    private helpButton: THREE.Mesh;
    private cameraButton: THREE.Mesh;
    private spinButton: THREE.Mesh;
    private pressedSpinButton: THREE.Mesh;

    private textureLoaderSpin = new THREE.TextureLoader();
    private textureLoaderPressedSpin = new THREE.TextureLoader();

    private textureSpinButton: THREE.Texture;
    private texturePressedSpinButton: THREE.Texture;

    public mainCursor: THREE.Mesh;
    public greenBroomCursor: THREE.Mesh;
    public redBroomCursor: THREE.Mesh;

    public playerRemainingStones: THREE.Mesh[];
    public aiRemainingStones: THREE.Mesh[];
    public round: THREE.Mesh;

    constructor(scene: THREE.Scene, gameInfoService: GameInfoService) {
        this.scene = scene;
        this.gameInfoService = gameInfoService;
        this.playerRemainingStones = [];
        this.aiRemainingStones = [];
        this.topScores = [];
        this.tips = [];

        this.textureSpinButton = this.textureLoaderSpin.load('assets/images/hud/spin.png');
        this.texturePressedSpinButton = this.textureLoaderPressedSpin.load('assets/images/hud/pressedSpin.png');

        this.createPowerLines();
        this.createNamesAndScore();
        this.createHelpButton();
        this.createCameraButton();
        this.createSpinButton();
        this.createTips();
        this.createCursors();
        this.createRemainingStones();
        this.createRounds();
    }

    private createPowerLines(): void {
        this.powerLine = new PowerLine(this.scene);
        new PowerLineBackground(this.scene);
    }

    private createNamesAndScore(): void {

        this.playerName = new RobotoText(
            this.gameInfoService.getPlayerName() + " -",
            new THREE.Vector3(0, -200, 0),
            "playerName"
        );
        this.playerName.setAlignmentToRight();
        this.playerName.init(this.scene);

        let difficultyString = "Facile";
        if (this.gameInfoService.getDifficulty() === Difficulty.HARD) {
            difficultyString = "Difficile";
        }
        let aiName = new RobotoText(
            "- IA " + difficultyString,
            new THREE.Vector3(0, -200, 0),
            "aiName"
        );
        aiName.init(this.scene);

        this.playerScore = new RobotoText(
            this.gameInfoService.getPlayerScore() + " -",
            new THREE.Vector3(0, -230, 0),
            "playerScore"
        );
        this.playerScore.setAlignmentToRight();
        this.playerScore.init(this.scene);

        this.aiScore = new RobotoText(
            "- " + this.gameInfoService.getAiScore(),
            new THREE.Vector3(0, -230, 0),
            "aiScore"
        );
        this.aiScore.init(this.scene);
    }

    public createHelpButton(): void {
        let textureLoader = new THREE.TextureLoader();
        let helpButtonTexture = textureLoader.load('assets/images/hud/helpButton.png');
        this.helpButton = new THREE.Mesh(
            new THREE.CubeGeometry(50, 50, 1),
            new THREE.MeshBasicMaterial({ map: helpButtonTexture, transparent: true })
        );
        this.helpButton.name = "helpButton";
        this.helpButton.position.set(Settings.HUD_WIDTH / 2 - 25 - 50 / 2, Settings.HUD_HEIGHT / 2 - 25 - 50 / 2, 0);
        this.scene.add(this.helpButton);
    }

    private createCameraButton(): void {
        let textureLoader = new THREE.TextureLoader();
        let texture = textureLoader.load('assets/images/hud/camera.png');
        this.cameraButton = new THREE.Mesh(
            new THREE.CubeGeometry(50, 50, 1),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true })
        );
        this.cameraButton.name = "cameraButton";
        this.cameraButton.position.set(-Settings.HUD_WIDTH / 2 + 25 + 50 / 2, Settings.HUD_HEIGHT / 2 - 25 - 50 / 2, 0);
        this.scene.add(this.cameraButton);
    }

    public createSpinButton(): void {
        this.spinButton = new THREE.Mesh(
            new THREE.CubeGeometry(60, 60, 1),
            new THREE.MeshBasicMaterial({ map: this.textureSpinButton, transparent: true })
        );
        this.spinButton.name = "spinButton";
        this.spinButton.position.set(-Settings.HUD_WIDTH / 2 + 25 + 50 / 2,
            Settings.HUD_HEIGHT / 2 - 25 - 50 / 2 - 75, 0);
        this.scene.add(this.spinButton);
    }

    public createPressedSpinButton(): void {
        this.pressedSpinButton = new THREE.Mesh(
            new THREE.CubeGeometry(60, 60, 1),
            new THREE.MeshBasicMaterial({ map: this.texturePressedSpinButton, transparent: true })
        );
        this.pressedSpinButton.name = "pressedSpinButton";
        this.pressedSpinButton.position.set(-Settings.HUD_WIDTH / 2 + 25 + 50 / 2,
            Settings.HUD_HEIGHT / 2 - 25 - 50 / 2 - 75, 0);
        this.scene.add(this.pressedSpinButton);
    }

    public createReplayButton() {
        let textureLoader = new THREE.TextureLoader();
        let texture = textureLoader.load('assets/images/hud/restart.png');
        let replayButton = new THREE.Mesh(
            new THREE.CubeGeometry(60, 60, 1),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true })
        );
        replayButton.name = "replayButton";
        replayButton.position.set(145, -60, 0);
        this.scene.add(replayButton);
    }

    public createLeaveButton() {
        let textureLoader = new THREE.TextureLoader();
        let texture = textureLoader.load('assets/images/hud/leave.png');
        let leaveButton = new THREE.Mesh(
            new THREE.CubeGeometry(60, 60, 1),
            new THREE.MeshBasicMaterial({ map: texture, transparent: true })
        );
        leaveButton.name = "leaveButton";
        leaveButton.position.set(220, -60, 0);
        this.scene.add(leaveButton);
    }

    public createTips(): void {
        this.tipsBackground = new THREE.Mesh(
            new THREE.CubeGeometry(304, 70, 1),
            new THREE.MeshBasicMaterial({ color: 0x333333 })
        );
        this.tipsBackground.name = "tipsBackground";
        this.tipsBackground.position.set(210, 198, 0);

        this.tips.push(new RobotoText(
            "V: Change la vue de la caméra",
            new THREE.Vector3(73, 208, 1),
            "tip1",
            12,
            0xeeeeee
        ));
        this.tips.push(new RobotoText(
            "S: Alterne spin horaire et anti-horaire",
            new THREE.Vector3(73, 193, 1),
            "tip2",
            12,
            0xeeeeee
        ));
        this.tips.push(new RobotoText(
            "SPACE: Recharge la pierre",
            new THREE.Vector3(73, 178, 1),
            "tip3",
            12,
            0xeeeeee
        ));
        this.tips.forEach((tip) => {
            tip.init(new THREE.Scene());
        });
    }

    private createCursors(): void {
        let cursorsMaker = new CursorsMaker();
        this.mainCursor = cursorsMaker.createMainCursor();
        this.redBroomCursor = cursorsMaker.createRedBroomCursor();
        this.greenBroomCursor = cursorsMaker.createGreenBroomCursor();
        this.scene.add(this.mainCursor);
    }

    private createRemainingStones(): void {
        let textureLoader = new THREE.TextureLoader();
        let playerStoneTexture = textureLoader.load('assets/images/hud/blueStone.png');
        let aiStoneTexture = textureLoader.load('assets/images/hud/redStone.png');

        for (let i = 0; i < Settings.NUMBER_OF_STONES; i++) {
            let playerStone = new THREE.Mesh(
                new THREE.CubeGeometry(30, 30, 1),
                new THREE.MeshBasicMaterial({ map: playerStoneTexture, transparent: true })
            );
            playerStone.name = "playerRemainingStone" + i;
            playerStone.position.set(
                -Settings.HUD_WIDTH / 2 + 25 + 20 / 2,
                -Settings.HUD_HEIGHT / 2 + 25 + 20 / 2 + 30 * i,
                0
            );
            this.playerRemainingStones.push(playerStone);
            this.scene.add(this.playerRemainingStones[i]);

            let aiStone = new THREE.Mesh(
                new THREE.CubeGeometry(35, 35, 1),
                new THREE.MeshBasicMaterial({ map: aiStoneTexture, transparent: true })
            );
            aiStone.name = "AIRemainingStone" + i;
            aiStone.position.set(
                -Settings.HUD_WIDTH / 2 + 25 + 20 / 2 + 30,
                -Settings.HUD_HEIGHT / 2 + 25 + 20 / 2 + 30 * i,
                0
            );
            this.aiRemainingStones.push(aiStone);
            this.scene.add(this.aiRemainingStones[i]);
        }
    }

    private createRounds(): void {
        this.round = new THREE.Mesh(
            new THREE.CubeGeometry(50, 50, 1),
            new THREE.MeshBasicMaterial({ transparent: true })
        );
        this.round.name = "rounds";
        this.round.position.set(
            -Settings.HUD_WIDTH / 2 + 25 + 60 + 50 / 2,
            -Settings.HUD_HEIGHT / 2 + 25 + 30 / 2,
            0
        );
        this.scene.add(this.round);
    }

    public createScoreTable(): void {

        this.scoreTable = new THREE.Mesh(
            new THREE.CubeGeometry(500, 156, 1),
            new THREE.MeshBasicMaterial({
                color: 0x000000,
                opacity: 0.7,
                transparent: true
            })
        );
        this.scoreTable.name = "scoreTable";
        this.scoreTable.position.set(
            0,
            53,
            0
        );
        this.scene.add(this.scoreTable);
    }

    public addTopScores(topScore: RobotoText) {
        this.topScores.push(topScore);
    }

    public createTopScores() {
        for (let i = 0; i < this.topScores.length; i++) {
            this.topScores[i].init(this.scene);
        }
    }


}
