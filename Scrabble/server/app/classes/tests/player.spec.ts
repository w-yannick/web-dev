import { expect } from 'chai';

import { Player } from '../player';

describe('Player class', () => {

    let player: Player;
    let support: string[];

    beforeEach(() => {
        support = ["A", "B", "C", "D", "E", "E", "G"];
        player = new Player('Gaspoupouille');
        player.setSupport(support);
    });

    describe('Contains in support', () => {
        let lettersToSwap: string[];

        it("Size of letters to check should be smaller or equal than the support's size", () => {
            lettersToSwap = ["A", "B", "C", "D", "E", "E", "G", "H"];
            expect(player.belongsToSupport(lettersToSwap)).to.equal(false);
        });

        it("No letters to verify should not belong to the support", () => {
            lettersToSwap = [];
            expect(player.belongsToSupport(lettersToSwap)).to.equal(false);
        });

        it('Letters to check should be contain in the support', () => {
            lettersToSwap = ["A", "B", "C", "D", "E", "E", "G"];
            expect(player.belongsToSupport(lettersToSwap)).to.equal(true);

            lettersToSwap = ["A", "C", "D", "E"];
            expect(player.belongsToSupport(lettersToSwap)).to.equal(true);

            lettersToSwap = ["Y", "D"];
            expect(player.belongsToSupport(lettersToSwap)).to.equal(false);
        });
    });

    describe('Update Support', () => {
        let swapedLetters: string[];
        let lettersToSwap: string[];
        let newSupport: string[];

        it('Upadte is correct when there is enougth letters', () => {
            swapedLetters = ["X", "Y", "Z"];
            lettersToSwap = ["G", "A", "E"];
            newSupport = ["X", "B", "C", "D", "Y", "E", "Z"];

            player.updateSupport(swapedLetters, lettersToSwap);
            expect(player.getSupport()).to.eql(newSupport);
        });

        it("Upadte is correct when there isn't enougth letters", () => {
            swapedLetters = ["X", "Y"];
            lettersToSwap = ["G", "A", "E"];
            newSupport = ["X", "B", "C", "D", "Y", "E"];

            player.updateSupport(swapedLetters, lettersToSwap);
            expect(player.getSupport()).to.eql(newSupport);
        });

        it("Number of letters on support should be updated", () => {
            swapedLetters = ["X", "Y"];
            lettersToSwap = ["G", "A", "E"];
            newSupport = ["X", "B", "C", "D", "Y", "E"];

            player.updateSupport(swapedLetters, lettersToSwap);
            expect(player.getNumberOfLettersOnTheSupport()).to.equal(newSupport.length);
        });

        it('Correct swap with white letter ("*")', () => {
            support = ["A", "B", "C", "D", "*", "F", "G"];
            player.setSupport(support);

            swapedLetters = ["X", "Y"];
            lettersToSwap = ["*", "A"];
            newSupport = ["X", "B", "C", "D", "Y", "F", "G"];
            player.updateSupport(swapedLetters, lettersToSwap);
            expect(player.getSupport()).to.eql(newSupport);
        });
    });
    describe('startBelongToSupport', () => {
        it('When there is one blanc letter in the support, starBelongsToSupport()' +
            'should return true if we ask for 1 blanc letter', () => {
                support = ["A", "B", "C", "D", "*", "F", "G"];
                player.setSupport(support);

                expect(player.starBelongsToSupport(1)).to.equal(true);
            });

        it('When there is one blanc letter in the support, starBelongsToSupport()' +
            'should return false if we ask for 2 blanc letter', () => {
                support = ["A", "B", "C", "D", "*", "F", "G"];
                player.setSupport(support);

                expect(player.starBelongsToSupport(2)).to.equal(false);
            });

        it('When there is two blanc letter in the support, starBelongsToSupport()'
            + ' should return true if we ask for 1 blanc letter', () => {
                support = ["A", "*", "C", "D", "*", "F", "G"];
                player.setSupport(support);

                expect(player.starBelongsToSupport(1)).to.equal(true);
            });
    });


    describe('updateNumberLetterOnSupport', () => {

        it('Update is correct', () => {
            support = ["A", "B", "C", "D", undefined, undefined, undefined];
            player.setSupport(support);

            player.updateNumberOfLettersOnTheSupport();
            expect(player.getNumberOfLettersOnTheSupport()).to.equal(4);
        });
    });
});
