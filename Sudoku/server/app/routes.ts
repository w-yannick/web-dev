import * as express from 'express';
import * as requestedGridModelOperations from './modules/database-model-operations/grid-model-operations';
import { Logs } from './classes/logs';

module Route {

    export class Index {

        public generateGridEasyMode(req: express.Request, res: express.Response, next: express.NextFunction) {
            requestedGridModelOperations.sendGridFromDb(res, "easy");
        }

        public generateGridHardMode(req: express.Request, res: express.Response, next: express.NextFunction) {
            requestedGridModelOperations.sendGridFromDb(res, "hard");
        }

        public displayLogs(req: express.Request, res: express.Response, next: express.NextFunction) {
            let logs = Logs.getInstance();
            let logString = '<b>Logs</b><br>';
            if (logs.getLogs().length > 0) {
                for (let i = 0; i < logs.getLogs().length; i++) {
                    logString += logs.getLogs()[i]['date'];
                    logString += " : ";
                    logString += logs.getLogs()[i]['type'];
                    logString += " : ";
                    logString += logs.getLogs()[i]['description'];
                    logString += "<br>";
                }
                res.send(logString);
            }
            else {
                res.send("Aucun log");
            }
        }

        public verifySudoku(req: express.Request, res: express.Response, next: express.NextFunction) {
            requestedGridModelOperations.checkGrid(req.body.item.grid, req.body.item.id, res);
        }

    }

}

export = Route;
