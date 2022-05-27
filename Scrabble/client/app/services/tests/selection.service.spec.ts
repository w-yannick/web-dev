import { SelectionService } from '../selection.service';
import { SupportService } from '../support.service';
import { expect } from 'chai';

let supportService: SupportService;
let selectionService: SelectionService;

describe('Selection service tests', () => {

    beforeEach(() => {
        supportService = new SupportService();
        supportService.setSupport(['F', 'A', 'J', 'I', 'T', 'A', 'S']);
        selectionService = new SelectionService(supportService);
    });

    it('should swap the selection', done => {
        expect(selectionService.getSelection()).to.equal(false);
        selectionService.setSelection(true);
        expect(selectionService.getSelection()).to.equal(true);
        done();
    });

    it('should swap letters on support', done => {
        expect(selectionService.getSelectedLetter()).to.equal(0);
        let testingSupport = JSON.parse(JSON.stringify(supportService.getSupport()));

        selectionService.swapLettersOnSupport(2);
        expect(supportService.getSupport()[0]).to.equal(testingSupport[2]);
        expect(supportService.getSupport()[2]).to.equal(testingSupport[0]);

        testingSupport = JSON.parse(JSON.stringify(supportService.getSupport()));

        selectionService.swapLettersOnSupport(1);

        expect(supportService.getSupport()[1]).to.equal(testingSupport[2]);
        expect(supportService.getSupport()[2]).to.equal(testingSupport[1]);

        done();
    });





});
