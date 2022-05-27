import { expect } from 'chai';

import { Party } from '../../party';
import { Player } from '../../player';
import { PlaceWord } from '../place-word';
import { Orientation } from '../../global/enums';

describe('PlaceWord', () => {

    let placeWord: PlaceWord;
    let party: Party;
    let player: Player;
    let message: string;

    let io: SocketIO.Server;

    beforeEach(() => {
        party = new Party("bidon", io);
        player = new Player();
        player.setSupport(["A", "B", "C", "D", "E", "F", "G"]);
        placeWord = new PlaceWord(party, player, message);
        placeWord.setMessage('!placer h8h word');

    });

    it('Should correctly extract word from the message', () => {
        expect(placeWord.extractWord()).to.eql(["w", "o", "r", "d"]);
    });

    it('Should correctly extract column from the message', () => {
        expect(placeWord.extractColumn()).to.equal(7);
    });

    it('Should correctly extract row from the message', () => {
        expect(placeWord.extractRow()).to.equal(7);
    });

    describe('Word Operations', () => {

        let word: string[];

        beforeEach(() => {
            word = ["w", "O", "r", "D"];
        });

        it('Should transform a word in upper case', () => {
            placeWord.convertWordToUpperCase(word);
            expect(word).to.eql(["W", "O", "R", "D"]);
        });

        it('Should correctly extract column from the message', () => {
            expect(placeWord.numberOfLetterInUpperCase(word)).to.equal(2);
        });
    });

    describe('Orientation', () => {
        it('return correct orientation', () => {
            message = '!placer h8h incroyable';
            placeWord.setMessage(message);
            expect(placeWord.extractOrientation()).to.equal(Orientation.HORIZONTAL);
        });

        it('return correct orientation', () => {
            message = '!placer h8v incroyable';
            placeWord.setMessage(message);
            expect(placeWord.extractOrientation()).to.equal(Orientation.VERTICAL);
        });

        it('return correct orientation', () => {
            message = '!placer h12h incroyable';
            placeWord.setMessage(message);
            expect(placeWord.extractOrientation()).to.equal(Orientation.HORIZONTAL);
        });

        it('return correct orientation', () => {
            message = '!placer h12v incroyable';
            placeWord.setMessage(message);
            expect(placeWord.extractOrientation()).to.equal(Orientation.VERTICAL);
        });
    });
});
