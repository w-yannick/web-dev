import { expect } from 'chai';

import { Align } from '../global/enums';

import { RobotoText } from './roboto-text';

describe('Text', () => {

    let text: RobotoText;
    let scene: THREE.Scene;
    let textString = "Zizi";
    let textPosition = new THREE.Vector3(10, 10, 10);

    beforeEach(() => {
        text = new RobotoText(textString, textPosition);
        scene = new THREE.Scene();
        text.init(scene);
    });

    it('text should be created with the right parameters', () => {
        expect(text.getText()).to.equal(textString);
        expect(text.getPosition().equals(textPosition)).to.be.true;
    });

    it('color should be 0x0000ff when nothing is specified', () => {
        expect(text.getColor()).to.equal(0x0000ff);
    });

    it('size should be 20 when nothing is specified', () => {
        expect(text.getSize()).to.equal(20);
    });

    it('it should be possible to specify the size', () => {
        text = new RobotoText(textString, textPosition, undefined, 25);
        expect(text.getSize()).to.equal(25);
    });

    it('it should be possible to specify the color', () => {
        text = new RobotoText(textString, textPosition, undefined, undefined, 0xcccccc);
        expect(text.getColor()).to.equal(0xcccccc);
    });

    it('the alignment should be set to left by default', () => {
        expect(text.getAlignment()).to.equal(Align.LEFT);
    });

    it('it should be possible to set the alignment to center', () => {
        text.setAlignmentToCenter();
        expect(text.getAlignment()).to.equal(Align.CENTER);
    });

    it('it should be possible to set the alignment to right', () => {
        text.setAlignmentToRight();
        expect(text.getAlignment()).to.equal(Align.RIGHT);
    });

});
