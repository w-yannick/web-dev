import { Injectable } from '@angular/core';

import { Settings } from '../classes/global/settings';
import { Cursor } from '../classes/global/enums';

import { HudElements } from '../classes/hud-elements/hud-elements';
import { RobotoText } from '../classes/texts/roboto-text';

import { GameInfoService } from './game-info.service';

@Injectable()
export class HudService {

    private scene: THREE.Scene;
    private camera: THREE.OrthographicCamera;

    private powerSetInterval: number;
    public cursorOffset = 0;
    private hudElements: HudElements;

    private lastCursorPosition = new THREE.Vector2();

    private textures = new Array<THREE.Texture>();

    constructor(
        private gameInfoService: GameInfoService
    ) {
        let textureLoader = new THREE.TextureLoader();
        for (let i = 1; i <= 3; i++) {
            this.textures.push(textureLoader.load('assets/images/hud/round' + i + '.png'));
        }
    }

    public init(): void {
        this.scene = new THREE.Scene();

        this.camera = new THREE.OrthographicCamera(
            -Settings.HUD_WIDTH / 2,
            Settings.HUD_WIDTH / 2,
            Settings.HUD_HEIGHT / 2,
            -Settings.HUD_HEIGHT / 2,
            0,
            10
        );
        this.camera.position.z = 10;

        this.hudElements = new HudElements(this.scene, this.gameInfoService);

        this.updateGameInfo();
        this.setCursor(Cursor.NORMAL);
    }

    public changeToHudCoordinates(position: THREE.Vector2): void {
        position.x = (position.x - 0.5) * Settings.HUD_WIDTH;
        position.y = (-position.y + 0.5) * Settings.HUD_HEIGHT;
    }

    public updateCursor(position = this.lastCursorPosition): void {
        this.lastCursorPosition = position.clone();
        this.changeToHudCoordinates(position);
        let cursor = this.scene.getObjectByName("cursor");
        if (cursor !== undefined) {
            cursor.position.set(
                position.x + this.cursorOffset,
                position.y,
                2
            );
            this.shiftCursorDependingOnItsHeight();
        }
    }

    public shiftCursorDependingOnItsHeight() {
        let cursor = this.scene.getObjectByName("cursor") as THREE.Mesh;
        if (cursor !== undefined) {
            let box = new THREE.Box3().setFromObject(cursor);
            let halfBroomHeight = box.getSize().y / 2;
            cursor.position.y += halfBroomHeight;
        }
    }

    public isPressedButton(position: THREE.Vector2, button: THREE.Object3D): boolean {
        this.changeToHudCoordinates(position);
        let objects = this.getClickedObjects(position);
        let buttonSearch = objects.find((object) => {
            return object === button;
        });
        return buttonSearch !== undefined;
    }

    public isPressedHelpButton(position: THREE.Vector2): boolean {
        let helpButton = this.scene.getObjectByName("helpButton");
        return this.isPressedButton(position, helpButton);
    }

    public isPressedCameraButton(position: THREE.Vector2): boolean {
        let cameraButton = this.scene.getObjectByName("cameraButton");
        return this.isPressedButton(position, cameraButton);
    }

    public isPressedSpinButton(position: THREE.Vector2): boolean {
        let spinButton = this.scene.getObjectByName("spinButton");
        if (spinButton === undefined) {
            spinButton = this.scene.getObjectByName("pressedSpinButton");
        }
        return this.isPressedButton(position, spinButton);
    }

    public isPressedReplayButton(position: THREE.Vector2): boolean {
        let replayButton = this.scene.getObjectByName("replayButton");
        return this.isPressedButton(position, replayButton);
    }

    public isPressedLeaveButton(position: THREE.Vector2): boolean {
        let leaveButton = this.scene.getObjectByName("leaveButton");
        return this.isPressedButton(position, leaveButton);
    }

    public isAnyButtonPressed(position: THREE.Vector2) {
        let camera = this.isPressedCameraButton(position.clone());
        let spin = this.isPressedSpinButton(position.clone());
        let help = this.isPressedHelpButton(position);
        let replay = this.isPressedReplayButton(position.clone());
        return camera || spin || help || replay;
    }

    public getClickedObjects(position: THREE.Vector2): THREE.Object3D[] {
        let point = new THREE.Vector3(position.x, position.y, 10);
        let direction = new THREE.Vector3(0, 0, -1);
        let raycaster = new THREE.Raycaster(point, direction);
        let intersections = raycaster.intersectObjects(this.scene.children);
        return intersections.map((intersection) => {
            return intersection.object;
        });
    }

    public toggleHelp() {
        for (let i = 1; i <= this.hudElements.tips.length; i++) {
            let tip = this.scene.getObjectByName("tip" + i);
            let background = this.hudElements.tipsBackground;
            if (tip === undefined) {
                this.scene.add(background);
                this.scene.add(this.hudElements.tips[i - 1].getTextMesh());
            } else {
                this.scene.remove(background);
                this.scene.remove(tip);
            }
        }
    }

    public choosePower(): void {
        const TIME_TO_CHOOSE = 1500; // en ms
        const NUMBER_OF_STEPS = 50;
        this.hudElements.powerLine.getEnd().y = -225;
        this.powerSetInterval = Number(setInterval(
            _ => {
                this.hudElements.powerLine.getEnd().y += (225 / NUMBER_OF_STEPS);
                this.hudElements.powerLine.getEnd().y = Math.min(this.hudElements.powerLine.getEnd().y, 0);
                this.hudElements.powerLine.updateLineEnd();
            },
            TIME_TO_CHOOSE / NUMBER_OF_STEPS
        ));
    }

    public selectPower(): number {
        clearInterval(this.powerSetInterval);
        const LINE_LENGTH = 225;
        let percentage = 1 - ((-this.hudElements.powerLine.getEnd().y) / (LINE_LENGTH));
        const MIN = Settings.INITIAL_SPEED_FACTOR_RANGE[0];
        const MAX = Settings.INITIAL_SPEED_FACTOR_RANGE[1];
        return (percentage * (MAX - MIN)) + MIN;
    }

    public setCursor(type: Cursor): void {
        let cursor = this.scene.getObjectByName("cursor") as THREE.Mesh;
        if (type === Cursor.GREEN_BROOM && cursor === this.hudElements.greenBroomCursor) {
            return;
        }
        if (cursor !== undefined) {
            this.scene.remove(cursor);
        }
        switch (type) {
            case Cursor.NORMAL:
                cursor = this.hudElements.mainCursor;
                break;
            case Cursor.NONE:
                break;
            case Cursor.RED_BROOM:
                cursor = this.hudElements.redBroomCursor;
                break;
            case Cursor.GREEN_BROOM:
                cursor = this.hudElements.greenBroomCursor;
        }
        this.scene.add(cursor);
        this.updateCursor();
    }

    public getScene(): THREE.Scene {
        return this.scene;
    }

    public getCamera(): THREE.OrthographicCamera {
        return this.camera;
    }

    public updateGameInfo(): void {
        for (let i = 0; i < Settings.NUMBER_OF_STONES; i++) {
            let isVisible = i < this.gameInfoService.getPlayerStones();
            this.hudElements.playerRemainingStones[i].visible = isVisible;

            isVisible = i < this.gameInfoService.getAiStones();

            this.hudElements.aiRemainingStones[i].visible = isVisible;
        }

        for (let i = 0; i < Settings.NUMBER_OF_ROUNDS; i++) {
            let material = this.hudElements.round.material as THREE.MeshBasicMaterial;

            if (this.gameInfoService.getRound() === 1) {
                material.map = this.textures[0];
            }
            else if (this.gameInfoService.getRound() === 2) {
                material.map = this.textures[1];
            }
            else {
                material.map = this.textures[2];
            }
        }
    }

    public setSpin(spinClockwise: boolean): void {
        if (spinClockwise) {
            let pressedSpinButton = this.scene.getObjectByName("pressedSpinButton") as THREE.Mesh;
            let pressedSpinButtonHelp = this.scene.getObjectByName("pressedSpinButtonHelp") as THREE.Mesh;
            this.scene.remove(pressedSpinButton);
            this.scene.remove(pressedSpinButtonHelp);
            this.hudElements.createSpinButton();
        } else {
            let spinButton = this.scene.getObjectByName("spinButton") as THREE.Mesh;
            let spinButtonHelp = this.scene.getObjectByName("spinButtonHelp") as THREE.Mesh;
            this.scene.remove(spinButton);
            this.scene.remove(spinButtonHelp);
            this.hudElements.createPressedSpinButton();
        }
    }

    public updateScores(): void {
        this.scene.remove(this.hudElements.playerScore.getTextMesh());
        this.hudElements.playerScore = new RobotoText(this.gameInfoService.getPlayerScore() + " -",
            new THREE.Vector3(0, -230, 0),
            "playerScore"
        );

        this.hudElements.playerScore.setAlignmentToRight();
        this.hudElements.playerScore.init(this.scene);

        this.scene.remove(this.hudElements.aiScore.getTextMesh());
        this.hudElements.aiScore = new RobotoText(
            "- " + this.gameInfoService.getAiScore(),
            new THREE.Vector3(0, -230, 0),
            "aiScore"
        );
        this.hudElements.aiScore.init(this.scene);
    }

    public moveBroom(): void {
        if (!this.cursorOffset) {
            this.cursorOffset = 20;
        } else {
            this.cursorOffset = -this.cursorOffset;
        }
        let cursor = this.scene.getObjectByName("cursor") as THREE.Mesh;
        cursor.position.x += this.cursorOffset;
    }

    public addTopScores(text: string, position: THREE.Vector3) {
        let topScore = new RobotoText(text, position, undefined, undefined, 0xffffff);
        this.hudElements.addTopScores(topScore);
    }

    public removeScoreTable() {
        let scoreTable = this.scene.getObjectByName("scoreTable") as THREE.Mesh;
        this.scene.remove(scoreTable);
    }

    public addScoreTableAndTopScores() {
        this.hudElements.createScoreTable();
        this.hudElements.createTopScores();
    }

    public removeScores() {
        for (let i = 0; i < this.hudElements.topScores.length; i++) {
            this.scene.remove(this.hudElements.topScores[i].getTextMesh());
        }
    }

    public displayLeaveButton() {
        this.hudElements.createLeaveButton();
    }

    public removeLeaveButton() {
        let leaveButton = this.scene.getObjectByName("leaveButton") as THREE.Mesh;
        this.scene.remove(leaveButton);
    }

    public displayReplayButton() {
        this.hudElements.createReplayButton();
    }

    public removeReplayButton() {
        let replayButton = this.scene.getObjectByName("replayButton") as THREE.Mesh;
        this.scene.remove(replayButton);
    }

}
