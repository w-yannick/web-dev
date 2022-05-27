import { expect } from 'chai';
import * as dataOperations from './data-operations';

enum Comparison { INFERIORITY, SUPERIORITY, EQUALITY }

describe('Data operations', () => {
    let storedScores: Object[];
    let newScores: Object[];

    it('should compare 2 scores', done => {
        let score1 = 10;
        let score2 = 8;

        expect(dataOperations.compareScores(score1, score2)).to.equal(Comparison.SUPERIORITY);
        expect(dataOperations.compareScores(score2, score1)).to.equal(Comparison.INFERIORITY);
        expect(dataOperations.compareScores(score1, score1)).to.equal(Comparison.EQUALITY);

        done();
    });

    beforeEach(() => {
        storedScores = new Array<Object>();
        newScores = [
            { winnerScore: 4, loserScore: 2 },
            { winnerScore: 8, loserScore: 3 },
            { winnerScore: 7, loserScore: 4 },
            { winnerScore: 10, loserScore: 8 },
            { winnerScore: 3, loserScore: 2 },
        ];

    });

    it('should add an item to an empty array', done => {
        let newHighScoreArray: Object[] = [];

        dataOperations.addScore(newHighScoreArray, { winnerScore: 10, loserScore: 2 });

        expect(newHighScoreArray[0]['winnerScore']).to.equal(10);
        expect(newHighScoreArray[0]['loserScore']).to.equal(2);

        done();
    });

    beforeEach(() => {
        for (let i = 0; i < newScores.length; i++) {
            dataOperations.addScore(storedScores, newScores[i]);
        }
    });

    it('should add items while keeping them sorted', done => {
        let expectedResults = [10, 8, 7, 4, 3];

        for (let i = 0; i < expectedResults.length; i++) {
            expect(storedScores[i]['winnerScore']).to.equal(expectedResults[i]);
        }

        done();
    });

    it('should delete the last item when size is exceeded', done => {

        expect(storedScores.length).to.equal(5);
        dataOperations.addScore(storedScores, { winnerScore: 9 });
        expect(storedScores.length).to.equal(5);

        expect(storedScores[4]['winnerScore']).to.equal(4);
        expect(storedScores[1]['winnerScore']).to.equal(9);

        done();

    });

    it('should sort by loserScore when the winnerScores are even', done => {

        dataOperations.addScore(storedScores, { winnerScore: 10, loserScore: 5 });

        expect(storedScores[0]['loserScore']).to.equal(5);
        expect(storedScores[1]['loserScore']).to.equal(8);

        done();
    });

});
