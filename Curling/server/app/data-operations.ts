const HIGH_SCORE_MAX_LENGHT = 5;

enum Comparison { INFERIORITY, SUPERIORITY, EQUALITY }

module DataOperations {

    export function addScore(scores: Object[], newScore: Object) {
        let isTheSmallestScore = true;
        if (scores.length === 0) {
            scores.push(newScore);
            return;
        }
        for (let i = 0; i < scores.length; i++) {
            let winnerScoreComparison = compareScores(scores[i]['winnerScore'], newScore['winnerScore']);
            if (winnerScoreComparison === Comparison.EQUALITY) {
                let shift = (compareScores(scores[i]['loserScore'], newScore['loserScore']) ? 0 : 1);
                scores.splice(i + shift, 0, newScore);
                isTheSmallestScore = false;

                break;
            } else if (winnerScoreComparison === Comparison.INFERIORITY) {
                scores.splice(i, 0, newScore);
                isTheSmallestScore = false;
                break;
            }
        }
        if (isTheSmallestScore) {
            scores.push(newScore);
        }
        if (scores.length > HIGH_SCORE_MAX_LENGHT) {
            scores.splice(scores.length - 1, 1);
        }
    }


    export function compareScores(score: number, newScore: number): Comparison {
        if (score === newScore) {
            return Comparison.EQUALITY;
        } else if (score < newScore) {
            return Comparison.INFERIORITY;
        } else {
            return Comparison.SUPERIORITY;
        }
    }

}

export = DataOperations;
