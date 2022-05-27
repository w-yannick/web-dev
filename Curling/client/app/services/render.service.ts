import { Injectable } from '@angular/core';

import { StoneThrowingService } from '../services/stone-throwing.service';
import { IlluminationService } from '../services/illumination.service';
import { HudService } from '../services/hud.service';

import { Cart } from '../classes/general/cart';

import { Skybox } from '../classes/threejs/skybox';
import { Camera } from '../classes/cameras/camera';
import { GlObject } from '../classes/threejs/gl-object';
import { Lights } from '../classes/threejs/lights';

import { VictoryAnimation } from '../classes/general/victory-animation'; // AJOUT

@Injectable()
export class RenderService {

    private scene: THREE.Scene;
    public renderer: THREE.WebGLRenderer;

    private arena: GlObject;
    private skybox: Skybox;

    private camera: Camera;
    private lights: Lights;

    public victoryAnimation: VictoryAnimation;

    constructor(
        private stoneThrowingService: StoneThrowingService,
        private hudService: HudService,
        private illuminationService: IlluminationService
    ) { }

    public init(): void {

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true
        });
        this.renderer.autoClear = false;

        document.getElementById("game-window").appendChild(this.renderer.domElement);

        this.arena = new GlObject();
        this.arena.init(this.scene, '/assets/models/arena.dae');

        Cart.init(this.scene);

        this.camera = new Camera(this.scene);

        this.hudService.init();

        this.lights = new Lights(this.scene);

        this.stoneThrowingService.init(this.scene);

        this.illuminationService.init(this.scene);

        this.skybox = new Skybox();
        this.skybox.init(this.scene);

        this.victoryAnimation = new VictoryAnimation();
        this.victoryAnimation.init(this.scene);

        this.update();
    }

    public update(): void {
        window.requestAnimationFrame(_ => this.update());
        this.camera.followObject(Cart.activeStone.getMesh());

        this.victoryAnimation.animate();

        this.stoneThrowingService.update();

        this.render();
    }

    public render(): void {
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera.getCamera());
        this.renderer.clearDepth();
        this.renderer.render(this.hudService.getScene(), this.hudService.getCamera());
    }

    public getCamera(): Camera {
        return this.camera;
    }

    public getScene(): THREE.Scene {
        return this.scene;
    }

    public getVictoryAnimation() {
        return this.victoryAnimation;
    }
}
