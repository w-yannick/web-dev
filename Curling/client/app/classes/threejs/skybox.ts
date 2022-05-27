export class Skybox {

    private skyGeometry: THREE.CubeGeometry;
    private skyMaterial: THREE.MeshFaceMaterial;
    private skyBox: THREE.Mesh;

    private materialArrayTextures: THREE.MeshBasicMaterial[];

    constructor() {
        this.skyGeometry = new THREE.CubeGeometry(5000, 2550, 5000);
        this.materialArrayTextures = new Array<THREE.MeshBasicMaterial>();

        const NB_CUBE_FACE = 6;
        for (let i = 0; i < NB_CUBE_FACE; i++) {
            this.materialArrayTextures.push(new THREE.MeshBasicMaterial({
                side: THREE.BackSide
            }));
        }
        this.skyMaterial = new THREE.MeshFaceMaterial(this.materialArrayTextures);
        this.skyBox = new THREE.Mesh(this.skyGeometry, this.skyMaterial);
        this.skyBox.translateZ(1249);
        this.skyBox.rotateX(90 * Math.PI / 180);
    }

    public init(scene: THREE.Scene): void {
        this.loadTextures();
        scene.add(this.skyBox);
    }

    private loadTextures(): void {
        const imagePrefix = "../../../assets/models/textures/skybox-";
        const directions = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
        const imageSuffix = ".jpg";

        let textureLoader = new THREE.TextureLoader();
        for (let i = 0; i < directions.length; i++) {
            if (directions[i] === "yneg" || directions[i] === "zneg") {
                textureLoader.load(imagePrefix + directions[i] + imageSuffix, texture => {

                    this.materialArrayTextures[i].map = texture;
                    this.materialArrayTextures[i].side = THREE.BackSide;

                    this.materialArrayTextures[i].needsUpdate = true;
                    this.skyMaterial.needsUpdate = true;
                });
            }
        }
    }

}
