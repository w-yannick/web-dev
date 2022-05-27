import * as gridGenerator from '../modules/grid-operations/grid-generator';
import GeneratedGrid from '../database-models/generated-grid.model';
import { Logs } from './logs';
import { Difficulty } from './enums';

const REQUEST_TREATMENT_INTERVAL = 5000;

export class RequestHandler {

    private static instance = new RequestHandler();
    private requests: Difficulty[];
    private isTreatingRequest: boolean;

    public static getInstance(): RequestHandler {
        return RequestHandler.instance;
    }

    constructor() {
        if (RequestHandler.instance) {
            throw new Error("Error: Instantiation failed: Use Logs.getInstance() instead of new.");
        }
        RequestHandler.instance = this;
        this.requests = [];
        setInterval(this.treatRequest.bind(this), REQUEST_TREATMENT_INTERVAL);
    }

    addGenerationRequest(difficulty: number): void {
        this.requests.push(difficulty);
    }

    public treatRequest(): void {
        if (this.requests.length > 0 && !this.isTreatingRequest) {
            this.isTreatingRequest = true;
            this.addGridToDb();
        } else {
            return;
        }
    }

    public addGridToDb(): void {
        let generatedGrid: Object;
        let logs = Logs.getInstance();
        let difficultyString: string;

        if (this.requests[0] === Difficulty.EASY) {
            generatedGrid = gridGenerator.easyModeGrid();
            difficultyString = 'easy';
        } else {
            generatedGrid = gridGenerator.hardModeGrid();
            difficultyString = 'hard';
        }
        new GeneratedGrid({
            gappedGrid: generatedGrid['gappedGrid'],
            completeGrid: generatedGrid['completeGrid'],
            difficulty: difficultyString
        }).save((error) => {
            if (error) {
                console.log(error);
            } else {
                logs.addLog({ type: 'Generation', description: this.requests[0] });
                this.getReadyForNextRequest();
            }
        });
    }

    private getReadyForNextRequest(): void {
        this.isTreatingRequest = false;
        this.requests.splice(0, 1);
    }
}
