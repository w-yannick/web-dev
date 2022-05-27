import { expect } from 'chai';

import { PowerLine } from './power-line';
import { TrajectoryLine } from './trajectory-line';

describe('Line', () => {

    let lineDashed: TrajectoryLine;
    let lineBasic: PowerLine;
    let scene: THREE.Scene;

    beforeEach(() => {
        scene = new THREE.Scene();
        lineDashed = new TrajectoryLine(scene);
        lineBasic = new PowerLine(scene);
    });

    it('basic lines should be created', () => {
        expect(lineBasic.getIsDashed()).to.equal(false);
        expect(lineBasic.getMaterial()).not.to.equal(undefined);
    });

    it('dashed lines should be created', () => {
        expect(lineDashed.getIsDashed()).to.equal(true);
        expect(lineDashed.getMaterial()).not.to.equal(undefined);
    });

    it('basic lines should be added to the scene', () => {
        let element = scene.getObjectByName("powerLine");
        expect(element).not.to.be.undefined;
    });

    it('dashed lines should be added to the scene', () => {
        let element = scene.getObjectByName("trajectoryLine");
        expect(element).not.to.be.undefined;
    });

    it('we should be able to change the start for basic and dashed lines', () => {
        let newPosition = new THREE.Vector3(69, 69, 69);
        lineBasic.setStart(newPosition);
        lineDashed.setStart(newPosition);
        expect(lineBasic.getStart().equals(newPosition)).to.be.true;
        expect(lineDashed.getStart().equals(newPosition)).to.be.true;
    });

    it('we should be able to change the end for basic and dashed lines', () => {
        let newPosition = new THREE.Vector3(420, 420, 420);
        lineBasic.setEnd(newPosition);
        lineDashed.setEnd(newPosition);
        expect(lineBasic.getEnd().equals(newPosition)).to.be.true;
        expect(lineDashed.getEnd().equals(newPosition)).to.be.true;
    });

    it('start point should be correctly updated', () => {
        lineDashed.updateLineStart();
        expect(lineDashed.getGeometry().vertices[0]).to.equal(lineDashed.getStart());
    });

    it('end point should be correctly updated', () => {
        lineDashed.updateLineEnd();
        expect(lineDashed.getGeometry().vertices[1]).to.equal(lineDashed.getEnd());
    });

});
