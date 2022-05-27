import { appInjector } from '../../modules/app.module';

import { GameInfoService } from '../../services/game-info.service';
import { GameService } from '../../services/game.service';

export abstract class State {

    protected gameService: GameService;
    protected gameInfoService: GameInfoService;

    constructor() {
        console.log(this.constructor.name);
        setTimeout(() => this.gameService = appInjector.get(GameService));
        this.gameInfoService = appInjector.get(GameInfoService);
    }

    public treatMouseDown(): void { return; }

    public treatMouseUp(): void { return; }

    public treatSpaceKey(): void { return; }

}
