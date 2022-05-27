import RequestedGrid from '../../database-models/requested-grid.model';
import GeneratedGrid from '../../database-models/generated-grid.model';
import { Logs } from '../../classes/logs';
import { Difficulty } from '../../classes/enums';
import * as express from 'express';
import * as gridFormatFunctions from '../grid-operations/grid-format-functions';
import * as gridGenerator from '../grid-operations/grid-generator';


module GridModelOperations {

    export function sendGridFromDb(res: express.Response, requestDifficulty: string): void {
        let logs = Logs.getInstance();
        let difficulty: Difficulty;
        GeneratedGrid.findOneAndRemove({ difficulty: requestDifficulty }, function (err, grid) {
            if (err) {
                console.log(err);
            } else {
                addGridToDb(grid, res);
                let generatedGrid;
                if (requestDifficulty === "easy") {
                    generatedGrid = gridGenerator.easyModeGrid();
                    difficulty = Difficulty.EASY;
                } else {
                    generatedGrid = gridGenerator.hardModeGrid();
                    difficulty = Difficulty.HARD;
                }

                logs.addLog({ type: "Demande", description: difficulty });

                new GeneratedGrid({
                    gappedGrid: generatedGrid['gappedGrid'],
                    completeGrid: generatedGrid['completeGrid'],
                    difficulty: requestDifficulty
                }).save((error: any) => {
                    if (!error) {
                        logs.addLog({ type: "Generation", description: difficulty });
                    }
                });
            }
        });
    }


    export function checkGrid(gridToCheck: any, id: any, res: express.Response): void {
        RequestedGrid.findById(id, (err, grid) => {
            if (err) {
                console.log(err);
            } else {
                let solution = gridFormatFunctions.stringsToGrid(grid.completeGrid);
                if (gridFormatFunctions.compareGrids(gridToCheck, solution)) {
                    res.json({ isCorrect: true });
                }
                else {
                    res.json({ isCorrect: false });
                }
            }
        });
    }

    function addGridToDb(gridToAdd: any, res: express.Response): void {
        new RequestedGrid({ gappedGrid: gridToAdd['gappedGrid'], completeGrid: gridToAdd['completeGrid'] })
            .save(function (err, grid) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({ grid: gridFormatFunctions.stringsToGrid(gridToAdd['gappedGrid']), id: grid._id });
                }
            });
    }
}

export = GridModelOperations;
