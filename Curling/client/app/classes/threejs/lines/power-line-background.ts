import { Line } from './line';

export class PowerLineBackground extends Line {

    constructor(scene: THREE.Scene) {
        super();
        this.name = "backgroundLine";
        this.start = new THREE.Vector3(410, -225, 0);
        this.end = new THREE.Vector3(410, 0, 0);
        this.color = 0xcccccc;
        this.lineWidth = 30;
        this.isDashed = false;

        this.init(scene);
    }

}
