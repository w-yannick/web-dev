import { expect } from 'chai';

import { Party } from '../party';

describe('Party class', () => {

    let party: Party;
    let room: string;

    let playerName1: string;
    let playerName2: string;
    let io: SocketIO.Server;

    beforeEach(() => {
        room = "room1";
        playerName1 = 'Gaspoupouille';
        playerName2 = 'manou';

        party = new Party(room, io);
        party.addPlayer(playerName1);
        party.addPlayer(playerName2);

    });

    it('should assign a support of 7 letters to each player', () => {
        party.assingnRandomSupportForPlayers();
        party.getPlayers().forEach((player) => {
            expect(player.getSupport().length).to.equal(7);
        });
    });

    it('should return active player', () => {
        party.getPlayers()[0].setCanPlay(true);
        expect(party.getActivePlayer().getName()).to.equal(party.getPlayers()[0].getName());
    });

    it('should return correct player with a name', () => {
        expect(party.findPlayer(playerName1).getName()).to.equal(playerName1);
    });

    //next tour
    it('should pass the player\'s turn', done => {
        party.getPlayers()[0].setCanPlay(true);
        party.getPlayers()[1].setCanPlay(false);

        party.nextTour();

        expect(party.getActivePlayer()).to.equal(party.getPlayers()[1]);

        done();

    });

    it('should reduce players table', done => {
        party.deletePlayer('Gaspoupouille');

        expect(party.getPlayers().length).to.equal(1);

        done();

    });

});
