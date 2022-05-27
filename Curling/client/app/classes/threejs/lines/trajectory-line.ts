import { Settings } from '../../global/settings';

import { Line } from './line';

export class TrajectoryLine extends Line {

    constructor(scene: THREE.Scene) {
        super();
        this.name = "trajectoryLine";
        this.start = new THREE.Vector3(0, 0, 0.01);
        this.end = new THREE.Vector3(0, Settings.ARENA_LENGTH, 0.01);
        this.color = 0x0000ff;
        this.lineWidth = 4;
        this.isDashed = true;

        this.init(scene);
    }

}
