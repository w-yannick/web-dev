import { Line } from './line';

export class PowerLine extends Line {

    constructor(scene: THREE.Scene) {
        super();
        this.name = "powerLine";
        this.start = new THREE.Vector3(410, -225, 1);
        this.end = new THREE.Vector3(410, -225, 1);
        this.color = 0x0000ff;
        this.lineWidth = 30;
        this.isDashed = false;

        this.init(scene);
    }

}
