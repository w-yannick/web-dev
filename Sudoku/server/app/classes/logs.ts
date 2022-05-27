import { Difficulty } from './enums';

const LOGS_MAX_SIZE = 100;

export class Logs {

    private static instance: Logs = new Logs();

    public logs: Object[];

    public static getInstance(): Logs {
        return Logs.instance;
    }

    constructor() {
        if (Logs.instance) {
            throw new Error("Error: Instantiation failed: Use Logs.getInstance() instead of new.");
        }
        Logs.instance = this;
        this.logs = [];
    }

    public getLogs(): Object[] {
        return this.logs;
    }

    public addLog(log: Object) {
        if (log['type'] === undefined && log['description'] === undefined) {
            return false;
        }

        this.convertDifficultyToString(log);

        let now = new Date();
        log['date'] = now.getHours() + "h " + now.getMinutes() + "m " + now.getSeconds() + "s";

        this.logs.unshift(log);
        if (this.logs.length > LOGS_MAX_SIZE) {
            this.logs.pop();
        }
    }

    public convertDifficultyToString(log: Object): void {
        if (log['description'] === Difficulty.EASY) {
            log['description'] = 'Facile';
        } else {
            log['description'] = 'Difficile';
        }
    }

}
