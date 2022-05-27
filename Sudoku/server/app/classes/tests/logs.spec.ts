import { expect } from 'chai';
import { Logs } from '../logs';
import { Difficulty } from '../enums';

describe('Logs tests', () => {

    let easyLog: Object;
    let hardLog: Object;
    let logs: Logs;

    beforeEach(() => {
        logs = Logs.getInstance();
        easyLog = { type: 'Generation', description: Difficulty.EASY };
        hardLog = { type: 'Generation', description: Difficulty.HARD };
    });

    it('should convert a difficulty into a french string', done => {
        logs.convertDifficultyToString(easyLog);
        logs.convertDifficultyToString(hardLog);

        expect(easyLog['description']).to.equal('Facile');
        expect(hardLog['description']).to.equal('Difficile');

        done();
    });

    it('should add a log with a time and a string description', done => {
        logs.addLog(easyLog);
        logs.addLog(hardLog);

        expect(logs.getLogs()[0]['date']).to.not.be.undefined;
        expect(logs.getLogs()[0]['description']).to.equal('Difficile');

        expect(logs.getLogs()[1]['date']).to.not.be.undefined;
        expect(logs.getLogs()[1]['description']).to.equal('Facile');

        done();
    });

});
