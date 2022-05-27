import { WordChecker } from '../word-checker';
import { expect } from 'chai';

let mots: string[];
let mot: string;

describe('word checker', () => {

    beforeEach(() => {
        mots = ['abris', 'babiole', 'caramel', 'eau', 'hyper', 'kyste',
        'manipuler', 'narval', 'ours', 'quart', 'recette', 'tuile', 'vol', 'wagon', 'Xylol', 'zebre'];
        mot = 'XyLoL';
    });

    it('should check if an array of words exist', done => {
        expect(WordChecker.checkWord(mot)).to.equal(true);
        expect(WordChecker.checkWord('cemotexistepas')).to.equal(false);
        done();
    });

    it('should check if a exists', done => {

        expect(WordChecker.checkWords(mots)).to.equal(true);
        mots[2] = 'cemotexistepas';
        expect(WordChecker.checkWords(mots)).to.equal(false);
        done();

    });

});
