import * as mongoose from 'mongoose';
import GeneratedGrid from '../../database-models/generated-grid.model';
import { RequestHandler } from '../../classes/requests-handler';
import { Difficulty } from '../../classes/enums';

module DatabaseInit {
    export function initialiseDatabase(): void {
        mongoose.connect('mongodb://localhost:27017/sudoku',
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Connexion etablie");
                    setupGrids();
                }
            }
        );
    }

    function setupGrids(): void {
        let requests = RequestHandler.getInstance();
        GeneratedGrid.find({ difficulty: 'easy' }, function (err, grids) {
            if (err) {
                console.log(err);
            } else {
                let nbGeneratedGrids = grids.length;
                for (let i = nbGeneratedGrids; i < 3; i++) {
                    requests.addGenerationRequest(Difficulty.EASY);

                }
            }
        });
        GeneratedGrid.find({ difficulty: 'hard' }, function (err, grids) {
            if (err) {
                console.log(err);
            } else {
                let nbGeneratedGrids = grids.length;
                for (let i = nbGeneratedGrids; i < 3; i++) {
                    requests.addGenerationRequest(Difficulty.HARD);
                }
            }
        });

    }


}

export = DatabaseInit;
