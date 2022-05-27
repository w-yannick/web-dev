import { expect } from 'chai';

import { LettersManager } from '../letters-manager';

describe('Letter generation', () => {

    it('should take 3 words from the letter stock', done => {

        let letterStock = [
            'A', 'B', 'C', 'F',
            'P', 'A', 'T', 'E',
            'A', 'T', 'H', 'E',
            'T', 'E', 'T', 'T'
        ];

        let generatedLetters = LettersManager.generateLetters(3, letterStock);
        expect(generatedLetters.length).to.equal(3);
        expect(letterStock.length).to.equal(13);

        done();
    });

    it('should take remove a letter from the stock and return it', done => {

        let letterStock = ['A', 'B'];
        let generatedLetter = LettersManager.generateLetters(1, letterStock);
        expect(letterStock.length === 1).to.equal(true);
        expect(generatedLetter.length === 1).to.equal(true);
        if (generatedLetter[0] === 'A') {
            expect(letterStock[0] === 'B').to.equal(true);
        } else {
            expect(letterStock[0] === 'A').to.equal(true);
        }

        done();

    });

    it('should swap a letter', done => {
        let letterStock = ['A'];
        let swappedLetter = LettersManager.swapLetters(letterStock, ['B']);

        expect(letterStock[0] === 'B').to.equal(true);
        expect(swappedLetter[0] === 'A').to.equal(true);

        done();

    });

    it('should increase letterStock from 2 to 4 letters', done => {
        let letterStock = ['A', 'B'];
        expect(letterStock.length).to.equal(2);
        let lettersToReturn = ['A', 'B'];
        expect(lettersToReturn.length).to.equal(2);
        LettersManager.returnLetters(letterStock, lettersToReturn);

        expect(letterStock.length).to.equal(4);

        done();

    });

    it('should add to letterStock AB and letterStock should equal ABAB', done => {
        let letterStock = ['A', 'B'];
        let lettersToReturn = ['A', 'B'];
        LettersManager.returnLetters(letterStock, lettersToReturn);
        let newLetterStock = ['A', 'B', 'A', 'B'];
        expect(letterStock).to.eql(newLetterStock);

        done();

    });
});
