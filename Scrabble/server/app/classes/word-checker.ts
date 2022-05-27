import * as dictionary from '../data/dictionary';

export class WordChecker {

    public static checkWords(words: string[]): boolean {
        let areCorrect = true;
        for (let i = 0; i < words.length; i++) {
            if (!this.checkWord(words[i])) {
                areCorrect = false;
                break;
            }
        }
        return areCorrect;
    }

    public static checkWord(word: string): boolean {
        let upperWord = word.toLocaleUpperCase();
        return dictionary[upperWord[0]].includes(upperWord);
    }

}
