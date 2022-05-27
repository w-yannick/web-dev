import * as gridOperations from "./grid-operations";

module GridChecker {

    let numberOfSolutions = 0;

    export function onlyOneSolution(grid: number[][]): boolean {
        numberOfSolutions = 0;
        return backtrackSolutions(grid);
    }

    export function backtrackSolutions(initialGrid: number[][]): boolean {

        let grid = gridOperations.cloneGrid(initialGrid);

        if (numberOfSolutions > 1) {
            return false;
        }

        if (!isValid(grid)) {
            return (numberOfSolutions === 1);
        }

        let firstGap = findFirstGapCoordinates(grid);

        if (firstGap === undefined) {
            numberOfSolutions++;
            return (numberOfSolutions === 1);
        }

        for (let i = 1; i < 10; i++) {
            grid[firstGap.i][firstGap.j] = i;
            backtrackSolutions(grid);
        }

        return (numberOfSolutions === 1);

    }

    export function isValid(grid: number[][]): boolean {

        for (let i = 0; i < grid.length; i++) {
            let foundInRow = [false, false, false, false, false, false, false, false, false];
            let foundInColumn = foundInRow.slice();
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j] !== undefined) {
                    if (foundInRow[grid[i][j]] === true) {
                        return false;
                    } else {
                        foundInRow[grid[i][j]] = true;
                    }
                }
                if (grid[j][i] !== undefined) {
                    if (foundInColumn[grid[j][i]] === true) {
                        return false;
                    } else {
                        foundInColumn[grid[j][i]] = true;
                    }
                }
            }
        }

        for (let squareRow = 0; squareRow <= 6; squareRow += 3) {
            for (let squareColumn = 0; squareColumn <= 6; squareColumn += 3) {
                let foundInSquare = [false, false, false, false, false, false, false, false, false];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        let value = grid[squareRow + i][squareColumn + j];
                        if (value !== undefined) {
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

    export function findFirstGapCoordinates(grid: number[][]) {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[i][j] === undefined) {
                    return ({ i: i, j: j });
                }
            }
        }
        return undefined;
    }

}

export = GridChecker;
