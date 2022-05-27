export class Message {

    public content: string;
    public from: string;
    public isCommand: boolean;

    constructor(content: string, from: string, isCommand: boolean) {
        this.content = content;
        this.from = from;
        this.isCommand = isCommand;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string): void {
        this.content = content;
    }

    public getFrom(): string {
        return this.from;
    }

    public getIsCommand(): boolean {
        return this.isCommand;
    }

}
