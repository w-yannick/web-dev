

export class GridChecker {

    public checkValidity(inputGrid: number[][]): boolean {
        for (let i = 0; i < inputGrid.length; i++) {
            let foundInRow = [false, false, false, false, false, false, false, false, false];
            let foundInColumn = foundInRow.slice();
            for (let j = 0; j < inputGrid.length; j++) {
                if (inputGrid[i][j] !== null) {
                    if (foundInRow[inputGrid[i][j]] === true) {
                        return false;
                    } else {
                        foundInRow[inputGrid[i][j]] = true;
                    }
                }
                if (inputGrid[j][i] !== null) {
                    if (foundInColumn[inputGrid[j][i]] === true) {
                        return false;
                    } else {
                        foundInColumn[inputGrid[j][i]] = true;
                    }
                }
            }
        }

        for (let squareRow = 0; squareRow <= 6; squareRow += 3) {
            for (let squareColumn = 0; squareColumn <= 6; squareColumn += 3) {
                let foundInSquare = [false, false, false, false, false, false, false, false, false];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let value = inputGrid[squareRow + i][squareColumn + j];
                        if (value !== null) {
                            if (foundInSquare[value] === true) {
                                return false;
                            } else {
                                foundInSquare[value] = true;
                            }
                        }
                    }
                }
            }
        }

        return true;
    }

    public checkCompletion(inputGrid: number[][]): boolean {
        let isComplete = true;
        for (let i = 0; i < inputGrid.length; i++) {
            for (let j = 0; j < inputGrid.length; j++) {
                if (inputGrid[i][j] === null) {
                    isComplete = false;
                    break;
                }
            }
        }
        return isComplete;
    }
}
