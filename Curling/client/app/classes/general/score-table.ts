import { appInjector } from '../../modules/app.module';

import { HudService } from '../../services/hud.service';

export class ScoreTable {

    private hudService: HudService;

    constructor() {
        this.hudService = appInjector.get(HudService);
    }

    public addHighScores(highScores: any) {
        for (let i = 0; i < 5; i++) {
            let playerName = highScores[i]["playerName"];
            let winnerScore = highScores[i]["winnerScore"];
            let loserScore = highScores[i]["loserScore"];
            this.hudService.addTopScores(
                playerName,
                new THREE.Vector3(-230, 95 + (-25 * i), 5),
            );
            this.hudService.addTopScores(
                winnerScore + " : " + loserScore,
                new THREE.Vector3(0, 95 + (-25 * i), 5)
            );
            this.hudService.addTopScores(
                " IA ",
                new THREE.Vector3(200, 95 + (-25 * i), 5)
            );
        }
    }

}
