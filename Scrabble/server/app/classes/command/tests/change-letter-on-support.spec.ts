import { expect } from 'chai';

import { Party } from '../../party';
import { Player } from '../../player';
import { ChangeLetterOnSupport } from '../change-letter-on-support';

describe('ChangeLetterOnSupport', () => {
    let changeLetterOnSupport: ChangeLetterOnSupport;
    let party: Party;
    let player: Player;
    let message: string;

    let io: SocketIO.Server;

    beforeEach(() => {
        party = new Party("bidon", io);
        player = new Player();
        player.setSupport(["A", "B", "C", "D", "E", "F", "G"]);
    });

    describe('execute(): ', () => {
        it('should return an error about letters belong to player support', () => {
            message = '!changer abb';
            changeLetterOnSupport = new ChangeLetterOnSupport(party, player, message);
            expect(changeLetterOnSupport.execute()[0]).to.equal("U");
        });

        it('should return an error about letterStock that have enougth letters', () => {
            party.setLetterStock(new Array<string>());
            message = '!changer abc';
            changeLetterOnSupport = new ChangeLetterOnSupport(party, player, message);
            expect(changeLetterOnSupport.execute()[0]).to.equal("L");
        });

        it('should return correct message', () => {
            message = '!changer abc';
            changeLetterOnSupport = new ChangeLetterOnSupport(party, player, message);
            expect(changeLetterOnSupport.execute()[0]).to.equal("!");
        });
    });
});
