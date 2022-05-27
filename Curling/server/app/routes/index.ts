import * as express from 'express';
import { DbController } from '../db-controller';

module Route {

  export class Index {

    public index(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.send('Hello world');
    }

    public sendEasyHighScores(req: express.Request, res: express.Response, next: express.NextFunction) {
      DbController.getInstance().sendHighScores(res, 'easy');
    }

    public sendHardHighScores(req: express.Request, res: express.Response, next: express.NextFunction) {
      DbController.getInstance().sendHighScores(res, 'hard');
    }

    public postHighScore(req: express.Request, res: express.Response, next: express.NextFunction) {
      DbController.getInstance().addHighScore(res, req.body.item);
    }
    public glComponent(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.redirect('/glcomp');
    }

  }
}

export = Route;
