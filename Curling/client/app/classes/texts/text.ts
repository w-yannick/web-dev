import { Align } from '../global/enums';


export abstract class Text {

    // text to generate once the font will be loaded
    protected queue: Array<Text>;

    private textMesh: THREE.Mesh;

    private textGeometry: THREE.TextGeometry;
    private align = Align.LEFT;
    private position: THREE.Vector3;
    private text: string;
    private size: number;
    private color: number;
    private name: string;
    protected path: string;

    private scene: THREE.Scene;

    constructor(text: string, position: THREE.Vector3, name?: string, size = 20, color = 0x0000ff) {
        this.text = text;
        this.position = position;
        this.size = size;
        this.color = color;
        this.name = name;
    }

    protected abstract getFont(): THREE.Font;
    protected abstract setFont(font: THREE.Font): void;

    public init(scene: THREE.Scene): void {
        this.scene = scene;
        if (!this.queue.length && this.getFont() === undefined) {
            this.loadFont();
        }
        if (this.getFont() !== undefined) {
            this.generate();
        } else { // can't load the text yet
            this.queue.push(this);
        }
    }

    public loadFont() {
        let fontLoader = new THREE.FontLoader();
        fontLoader.load('/assets/fonts/' + this.path, response => {
            this.setFont(Object(response) as THREE.Font);
            for (let text of this.queue) { // treat the queue
                text.generate();
            }
        });
    }

    private generate() {
        let font = this.getFont();
        this.textGeometry = new THREE.TextGeometry(this.text, {
            font: font,
            size: this.size,
            height: 0,
        } as THREE.TextGeometryParameters);

        let textMaterial = new THREE.MeshBasicMaterial({ color: this.color });

        this.textMesh = new THREE.Mesh(this.textGeometry, textMaterial);
        this.textMesh.name = this.name;
        this.textMesh.position.set(this.position.x, this.position.y, this.position.z);

        switch (this.align) {
            case Align.CENTER:
                this.alignCenter();
                break;
            case Align.RIGHT:
                this.alignRight();
        }
        this.scene.add(this.textMesh);
    }

    public alignCenter(): void {
        this.textGeometry.computeBoundingBox();
        this.textGeometry.center();
    }

    public alignRight(): void {
        this.textGeometry.computeBoundingBox();
        let box = this.textGeometry.boundingBox;
        let width = box.max.x - box.min.x;
        this.textMesh.position.x -= width;
    }

    public setAlignmentToCenter(): void {
        this.align = Align.CENTER;
    }

    public setAlignmentToRight(): void {
        this.align = Align.RIGHT;
    }

    public getText(): string {
        return this.text;
    }

    public getPosition(): THREE.Vector3 {
        return this.position;
    }

    public getSize(): number {
        return this.size;
    }

    public getColor(): number {
        return this.color;
    }

    public getAlignment(): Align {
        return this.align;
    }

    public getTextMesh(): THREE.Mesh {
        return this.textMesh;
    }

    public getTextGeometry(): THREE.TextGeometry {
        return this.textGeometry;
    }

}
