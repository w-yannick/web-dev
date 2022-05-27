import { Text } from './text';

export class RobotoText extends Text {

    private static robotoQueue = new Array<Text>();
    protected static font: THREE.Font;

    constructor(text: string, position: THREE.Vector3, name?: string, size = 20, color = 0x0000ff) {
        super(text, position, name, size, color);
        this.path = "roboto_regular.json";
        this.queue = RobotoText.robotoQueue;
    }

    protected getFont(): THREE.Font {
        return RobotoText.font;
    }

    protected setFont(font: THREE.Font): void {
        RobotoText.font = font;
    }

}
