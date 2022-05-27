import { SupportService } from '../support.service';
import { expect } from 'chai';

let supportService: SupportService;
describe('Support service tests', () => {

    beforeEach(() => {
        supportService = new SupportService();
        supportService.setSupport(['F', 'A', 'J', 'I', 'T', 'A', 'S']);
    });

    it('should set the support\'s letters', done => {

        expect(supportService.getSupport()).to.eql(['F', 'A', 'J', 'I', 'T', 'A', 'S']);
        done();

    });


    it('should swap 2 letters on the support', done => {
        let testingSupport = JSON.parse(JSON.stringify(supportService.getSupport()));
        supportService.swapLetters(0, 6);
        expect(testingSupport[0]).to.equal(supportService.getSupport()[6]);
        expect(supportService.getSupport()[0]).to.equal(testingSupport[6]);

        done();
    });
});
