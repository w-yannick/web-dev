import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Difficulty } from '../classes/global/enums';


@Injectable()
export class HighScoresService {

    constructor(private http_: Http) { }

    public getHighScores(difficulty: Difficulty) {
        const GET_EASY_HIGH_SCORES_URL = 'http://localhost:3002/get-easy-high-scores';
        const GET_HARD_HIGH_SCORES_URL = 'http://localhost:3002/get-hard-high-scores';
        if (difficulty === Difficulty.EASY) {
            return this.httpGetRequest(GET_EASY_HIGH_SCORES_URL);
        } else {
            return this.httpGetRequest(GET_HARD_HIGH_SCORES_URL);
        }
    }

    public postHighScore(playerName: string, winnerScore: number, loserScore: number, difficulty: Difficulty) {
        const POST_HIGH_SCORES_URL = 'http://localhost:3002/high-score-post';
        let item: Object;
        let stringDifficulty = (difficulty === Difficulty.EASY) ? 'easy' : 'hard';
        item = {
            playerName: playerName,
            winnerScore: winnerScore,
            loserScore: loserScore,
            difficulty: stringDifficulty
        };
        return this.httpPostRequest(POST_HIGH_SCORES_URL, item);
    }

    private httpGetRequest(urlRequest: string) {
        return this.http_.get(urlRequest).map((res: Response) => {
            return res.json() || {};
        });
    }

    private httpPostRequest(urlRequest: string, item: Object) {
        return this.http_.post(urlRequest, { item }).map((res: Response) => {
            return res.json() || {};
        });
    }

}
