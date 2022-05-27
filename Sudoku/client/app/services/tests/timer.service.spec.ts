import { expect } from 'chai';

import { TimerService } from '../timer.service';

describe('TimerService', () => {

    let timerService: TimerService;

    beforeEach(() => {
        timerService = new TimerService();
    });

    it('should return the a timer with seconds and minutes', done => {
        expect(timerService.getTime()['seconds']).to.not.be.undefined;
        expect(timerService.getTime()['minutes']).to.not.be.undefined;
        done();
    });

    it('reset timer should set all variables to 0', () => {
        timerService.setTime(10, 10);
        timerService.resetTimer();
        expect(timerService.getTime()['minutes']).to.equal(0);
        expect(timerService.getTime()['seconds']).to.equal(0);
    });

    it('toggle timer should show/hide the timer', () => {
        expect(timerService.getVisibility()).to.be.true;
        timerService.toggleVisibility();
        expect(timerService.getVisibility()).to.equal(false);
        timerService.toggleVisibility();
        expect(timerService.getVisibility()).to.equal(true);
    });

});
