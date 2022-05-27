import { Injectable } from '@angular/core';

import { Settings } from '../classes/global/settings';

import { Camera } from '../classes/cameras/camera';

@Injectable()
export class BroomService {

    private logs = new Array<any>();
    private shapes = new Array<THREE.Mesh>();
    private scene: THREE.Scene;
    private interval: number;

    public init(scene: THREE.Scene): void {
        this.scene = scene;
        clearInterval(this.interval);
        this.interval = setInterval(this.manageLogs.bind(this), 100);
    }

    public broom(position: THREE.Vector2, camera: Camera): void {
        let mouse = new THREE.Vector2(position.x - 0.5, -position.y + 0.5).multiplyScalar(2); // to (-1, 1)
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera.getCamera());
        let plane = new THREE.Plane(new THREE.Vector3(0, 0, 1));
        let target3D = raycaster.ray.intersectPlane(plane);
        let target2D = new THREE.Vector2(target3D.x, target3D.y);
        this.logs.push({ time: Date.now(), position: target2D });
        let shape = new THREE.Mesh(
            new THREE.CircleGeometry(Settings.STONE_RADIUS, 30),
            new THREE.MeshBasicMaterial({
                color: 0x00ddff,
                transparent: true,
                opacity: 0.3
            })
        );
        shape.position.set(target2D.x, target2D.y, 0.01);
        this.shapes.push(shape);
        this.scene.add(shape);
    }

    public manageLogs(): void {
        let time = Date.now();
        const BROOM_EFFECT_LIFE_SPAN = 1000; // en ms
        let i;
        for (i = 0; i < this.logs.length; i++) {
            if (this.logs[i].time + BROOM_EFFECT_LIFE_SPAN > time) {
                break;
            }
        }
        for (let j = 0; j < i; j++) {
            this.scene.remove(this.shapes[j]);
        }
        this.logs.splice(0, i);
        this.shapes.splice(0, i);
    }

    public isBroomed(position: THREE.Vector2): boolean {
        for (let elem of this.logs) {
            let broomedPosition = elem.position as THREE.Vector2;
            let distance = broomedPosition.distanceTo(position);
            if (distance < (2 * Settings.STONE_RADIUS)) {
                return true;
            }
        }
        return false;
    }

    public getLogs() {
        return this.logs;
    }

}
