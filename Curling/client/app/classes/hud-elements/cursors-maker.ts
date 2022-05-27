const RED_BROOM_PATH = "../../assets/images/hud/red-broom.png";
const GREEN_BROOM_PATH = "../../assets/images/hud/green-broom.png";

export class CursorsMaker {

    public createMainCursor() {
        let textureLoader = new THREE.TextureLoader();
        let texture = textureLoader.load('assets/images/hud/cursor.png');
        let cursor = new THREE.Mesh(
            new THREE.CubeGeometry(15, 15, 1),
            new THREE.MeshBasicMaterial({ map : texture, transparent : true })
        );
        cursor.name = "cursor";
        return cursor;
    }

    public createBroomCursor(filePath: string) {
        let geometry = new THREE.CubeGeometry(50, 100, 1);

        let materialArrayTextures = new Array<THREE.MeshBasicMaterial>();
        const NB_CUBE_FACE = 6;
        for (let i = 0; i < NB_CUBE_FACE; i++) {
            materialArrayTextures.push(new THREE.MeshBasicMaterial({
                transparent: true
            }));
        }
        let material = new THREE.MeshFaceMaterial(materialArrayTextures);

        let textureLoader = new THREE.TextureLoader();
        textureLoader.load(filePath, texture => {
            materialArrayTextures[4].map = texture;
            materialArrayTextures[4].needsUpdate = true;
            material.needsUpdate = true;
        });

        let cursor = new THREE.Mesh(geometry, material);
        cursor.name = "cursor";

        return cursor;
    }

    public createRedBroomCursor() {
        return this.createBroomCursor(RED_BROOM_PATH);
    }

    public createGreenBroomCursor() {
        return this.createBroomCursor(GREEN_BROOM_PATH);
    }

}
