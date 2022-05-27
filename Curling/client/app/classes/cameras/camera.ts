import { Settings } from '../global/settings';

export class Camera {

    private camera: THREE.Camera;

    private topCamera: THREE.OrthographicCamera;
    private perspectiveCamera: THREE.PerspectiveCamera;

    constructor(scene: THREE.Scene) {
        this.createPerspectiveCamera();
        this.createTopCamera();

        this.camera = this.perspectiveCamera;

        scene.add(this.camera);
    }

    private createPerspectiveCamera(): void {
        this.perspectiveCamera = new THREE.PerspectiveCamera(undefined, Settings.CANVAS_RATIO, 0.1, 10000);
        this.perspectiveCamera.position.set(0, -4, 1);
        this.perspectiveCamera.up = new THREE.Vector3(0, 0, 1);
    }

    private createTopCamera(): void {
        const TOP = Settings.ARENA_LENGTH - 1.2;
        const BOTTOM = TOP - (2 * Settings.HOUSE_RADIUS) - 0.85;
        const WIDTH = Settings.CANVAS_RATIO * (TOP - BOTTOM);
        const LEFT = -WIDTH / 2;
        const RIGHT = -LEFT;
        this.topCamera = new THREE.OrthographicCamera(LEFT, RIGHT, TOP, BOTTOM, 1, 10000);
        this.topCamera.position.z = 10;
    }

    public changeCamera(): void {
        if (this.camera === this.perspectiveCamera) {
            this.camera = this.topCamera;
        } else {
            this.camera = this.perspectiveCamera;
        }
    }

    public followObject(target: THREE.Mesh): void {
        this.perspectiveCamera.position.set(0, target.position.y - 4, 1);
        this.perspectiveCamera.lookAt(new THREE.Vector3(0, target.position.y, 0));
    }

    public getCamera(): THREE.Camera {
        return this.camera;
    }

    public getTopCamera(): THREE.OrthographicCamera {
        return this.topCamera;
    }

    public getPerspectiveCamera(): THREE.PerspectiveCamera {
        return this.perspectiveCamera;
    }

}
