import { GameInfoService } from '../../services/game-info.service';
import { HighScoresService } from '../../services/high-scores.service';
import { appInjector } from '../../modules/app.module';
import { ScoreTable } from '../general/score-table';

export class HighScores {

    private highScores: any;
    private highScoresService: HighScoresService;
    private gameInfoService: GameInfoService;
    private scoreTable: ScoreTable;

    constructor() {
        this.highScoresService = appInjector.get(HighScoresService);
        this.gameInfoService = appInjector.get(GameInfoService);
        this.scoreTable = new ScoreTable();
    }

    public updateAndGetHighScores() {
        if (this.playerWon()) {
            console.log(this.gameInfoService.getPlayerName(),
                this.gameInfoService.getPlayerScore(),
                this.gameInfoService.getAiScore(),
                this.gameInfoService.getDifficulty());
            this.highScoresService.postHighScore(
                this.gameInfoService.getPlayerName(),
                this.gameInfoService.getPlayerScore(),
                this.gameInfoService.getAiScore(),
                this.gameInfoService.getDifficulty()
                
            ).subscribe((resScores: any) => {
                this.highScores = resScores[0]['scoreObject'];
                this.scoreTable.addHighScores(this.highScores);
            });
        }
        else {

            this.highScoresService.getHighScores(this.gameInfoService.getDifficulty())
                .subscribe((resScore: any) => {
                    this.highScores = resScore[0]['scoreObject'];
                    this.scoreTable.addHighScores(this.highScores);
                });
        }
    }
    public playerWon(): boolean {
        return (this.gameInfoService.getPlayerScore() > this.gameInfoService.getAiScore());
    }

    public getHighScores() {
        return this.highScores;
    }


}
