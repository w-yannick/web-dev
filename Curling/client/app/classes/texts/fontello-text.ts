import { Text } from './text';

export class FontelloText extends Text {

    protected static fontelloQueue = new Array<Text>();
    protected static font: THREE.Font;

    constructor(text: string, position: THREE.Vector3, name?: string, size = 20, color = 0x0000ff) {
        super(text, position, name, size, color);
        this.path = "fontello_regular.json";
        this.queue = FontelloText.fontelloQueue;
    }

    protected getFont(): THREE.Font {
        return FontelloText.font;
    }

    protected setFont(font: THREE.Font): void {
        FontelloText.font = font;
    }
}
