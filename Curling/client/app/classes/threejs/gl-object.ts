export class GlObject {

    private colladaLoader: THREE.ColladaLoader;
    protected mesh: THREE.Mesh;

    constructor(isInvisible = false) {
        this.mesh = new THREE.Mesh;
        if (isInvisible) {
            this.colladaLoader = undefined;
        } else {
            this.colladaLoader = new THREE.ColladaLoader;
        }
    }

    public init(scene: THREE.Scene, fileName: string, visible = true): void {
        this.colladaLoader.load(fileName, (result) => {
            let object3D = result.scene as THREE.Object3D;
            object3D.visible = visible;
            object3D.position.set(0, 0, 0);
            object3D.rotateX(90 * Math.PI / 180);

            this.mesh = object3D as THREE.Mesh;
            setTimeout(() => {
                scene.add(this.mesh);
            }, 2000);
        });
    }

    public getMesh(): THREE.Mesh {
        return this.mesh;
    }

}
