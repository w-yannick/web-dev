import * as mongoose from 'mongoose';
import HighScores from './high-scores.model';
import * as express from 'express';
import * as dataOperations from './data-operations';

const DATABASE_URL = 'mongodb://localhost:27017/test';

class DbController {

    private static instance: DbController = new DbController();

    public static getInstance(): DbController {
        return DbController.instance;
    }

    constructor() {
        mongoose.connect(DATABASE_URL,
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connexion etablie");
                }
            }
        );
    }


    public sendHighScores(res: express.Response, difficulty: string) {
        HighScores.find({ difficulty: difficulty }, (err, scores) => {
            if (err) {
                console.log("Erreur au moment de l'acces a la base de donnee");
            } else {
                res.json(scores);
            }
        });

    }

    public addHighScore(res: express.Response, scoreObject: Object) {
        HighScores.find({ difficulty: scoreObject['difficulty'] }, (err, scores) => {
           // let scoresArray;
            if (err) {
                console.log("Erreur au moment de la requette");
            } else {
                let scoresArray = scores[0].scoreObject;
                if (typeof scores[0] != 'undefined' && scores[0].scoreObject[scores[0].scoreObject.length - 1]['winnerScore'] <= scoreObject['winnerScore']) {
                    dataOperations.addScore(scores[0].scoreObject, scoreObject);
                    scores[0].save((error) => { 
                        if (error) {
                            console.log("Erreur lors de la modification de la BD");
                        }
                    });
                } else if(typeof scores[0] == 'undefined'){
                    let newScore = new HighScores();
                    newScore.difficulty = scoreObject['difficulty'];
                    dataOperations.addScore(newScore.scoreObject, scoreObject);
                    newScore.save((error) => {
                        if (error) {
                            console.log("Erreur lors de la modification de la BD");
                        }
                    })
                }
                this.sendHighScores(res, scoreObject['difficulty']);
            }
        });
    }

}

export { DbController }
