export class Player {

    private name: string;
    private score: number;
    private numberOfLettersOnTheSupport: number;
    private canPlay: boolean;
    private support: string[];

    constructor(name: string = undefined) {
        this.canPlay = false;
        this.score = 0;
        this.numberOfLettersOnTheSupport = 0;
        this.name = name;
        this.support = new Array<string>();
    }

    public updateSupport(swapedLetters: string[], lettersToSwap: string[]): void {
        for (let i = 0; i < this.support.length; i++) {
            for (let j = 0; j < lettersToSwap.length; j++) {
                if (this.support[i] === lettersToSwap[j]) {
                    if (swapedLetters.length !== 0) {
                        this.support[i] = swapedLetters[0];
                        swapedLetters.splice(0, 1);
                    }
                    else {
                        this.support.splice(i, 1);
                    }
                    lettersToSwap.splice(j, 1);
                }
            }
        }

        for (let i = 0; i < this.support.length; i++) {
            for (let j = 0; j < lettersToSwap.length; j++) {
                if (this.support[i] === "*") {
                    if (swapedLetters.length !== 0) {
                        this.support[i] = swapedLetters[0];
                        swapedLetters.splice(0, 1);
                    }
                    else {
                        this.support.splice(i, 1);
                    }
                    lettersToSwap.splice(j, 1);
                }
            }
        }

        this.updateNumberOfLettersOnTheSupport();
        if (this.numberOfLettersOnTheSupport === 0) {
            this.canPlay = false;
        }
    }

    public starBelongsToSupport(nbStars: number): boolean {
        let stars = 0;
        for (let i = 0; i < this.support.length; i++) {
            if (this.support[i] === "*") {
                stars++;
            }
        }
        return (stars >= nbStars);
    }

    public belongsToSupport(lettersToCheck: string[]): boolean {
        if (lettersToCheck.length > this.support.length || lettersToCheck.length === 0) {
            return false;
        }

        let tempLettersToSwap: string[];
        tempLettersToSwap = JSON.parse(JSON.stringify(lettersToCheck)); //deep copy
        let nbWhites = 0;
        for (let i = 0; i < this.support.length; i++) {
            if (this.support[i] === "*") { nbWhites++; }
        }

        this.support.forEach((supportLetter) => {
            let index = tempLettersToSwap.findIndex((letterToSwap) => {
                return supportLetter === letterToSwap;
            });
            if (index !== -1) {
                tempLettersToSwap.splice(index, 1);
            }
        });

        if (nbWhites === tempLettersToSwap.length) {
            for (let i = 0; i < nbWhites; i++) {
                tempLettersToSwap.splice(i, 1);
            }
        }

        return !tempLettersToSwap.length;
    }

    public setCanPlay(canPlay: boolean): void {
        this.canPlay = canPlay;
    }

    public setSupport(support: string[]): void {
        this.support = support;
        this.updateNumberOfLettersOnTheSupport();
    }

    public setScore(score: number): void {
        this.score += score;
    }

    public getCanPlay(): boolean {
        return this.canPlay;
    }

    public getSupport(): string[] {
        return this.support;
    }

    public getName(): string {
        return this.name;
    }

    public getNumberOfLettersOnTheSupport(): Number {
        return this.numberOfLettersOnTheSupport;
    }

    public updateNumberOfLettersOnTheSupport(): void {
        this.numberOfLettersOnTheSupport = 0;
        this.support.forEach((letter) => {
            if (letter !== undefined) {
                this.numberOfLettersOnTheSupport++;
            }
        });
    }
}
