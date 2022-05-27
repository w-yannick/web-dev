import { Party } from './party';

export class PartyManager {

    private parties: Party[];

    constructor() {
        this.parties = new Array<Party>();
    }

    public createNewParty(idParty: string, io: SocketIO.Server): void {
        this.parties[idParty] = new Party(idParty, io);
    }

    public getParty(partyId: string): Party {
        return this.parties[partyId];
    }

}
