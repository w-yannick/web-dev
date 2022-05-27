export class LettersManager {

    public static generateLetters(numberToGenerate: number, letterStock: string[]): string[] {
        let generatedLetters: string[] = [];
        for (let i = 0; i < numberToGenerate; i++) {
            let randomIndex = Math.floor(Math.random() * letterStock.length);
            let deletedLetter = letterStock.splice(randomIndex, 1)[0];
            generatedLetters.push(deletedLetter);
        }
        return generatedLetters;
    }

    public static swapLetters(letterStock: string[], lettersToSwap: string[]): string[] {
        let swappedLetters = this.generateLetters(lettersToSwap.length, letterStock);
        for (let i = 0; i < lettersToSwap.length; i++) {
            letterStock.push(lettersToSwap[i]);
        }
        return swappedLetters;
    }

    public static returnLetters(letterStock: string[], lettersToReturn: string[]): void {
        for (let i = 0; i < lettersToReturn.length; i++) {
            letterStock.push(lettersToReturn[i]);
        }
    }

}
