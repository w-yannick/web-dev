export class Lights {

    constructor(scene: THREE.Scene) {
        let ambiantLight = this.createAmbiantLight();
        scene.add(ambiantLight);

        for (let i = 0; i <= 5; i++) {
            let spotLight = this.createSpotLight(i * 10);
            scene.add(spotLight);
        }
    }

    private createAmbiantLight(): THREE.AmbientLight {
        let ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
        ambientLight.name = "ambientLight";
        return ambientLight;
    }

    private createSpotLight(yPosition: number): THREE.SpotLight {
        let spotLight = new THREE.SpotLight(0xffffff, 0.7);
        spotLight.name = "spotLight" + yPosition;
        spotLight.position.set(0, yPosition, 3);
        spotLight.target.position.set(0, yPosition, 0);
        spotLight.target.updateMatrixWorld(true);
        spotLight.decay = 2;
        spotLight.penumbra = 0.5;
        spotLight.angle = Math.PI / 2;
        return spotLight;
    }

}
