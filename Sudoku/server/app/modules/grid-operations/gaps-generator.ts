import * as gridChecker from "./grid-checker";

/*
 * Adds gaps in a grid.
 */

module GapsGenerator {

    export function deleteDigits(grid: number[][], numberOfDigitsToDelete: number): void {

        let coordinates = [];
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                coordinates.push({ i: i, j: j });
            }
        }

        shuffle(coordinates);

        let numberOfDeletedDigits = 0;
        for (let k = 0; k < coordinates.length && numberOfDeletedDigits < numberOfDigitsToDelete; k++) {
            let i = coordinates[k].i;
            let j = coordinates[k].j;
            let deletedValue = grid[i][j];
            grid[i][j] = undefined;
            if (!gridChecker.onlyOneSolution(grid)) {
                grid[i][j] = deletedValue;
            } else {
                numberOfDeletedDigits++;
            }
        }
    }

    function shuffle(array: any[]) {
        for (let i = 0; i < array.length; i++) {
            let index = Math.floor(Math.random() * (i + 1));
            array[i] = [array[index], array[index] = array[i]][0]; // swap
        }
    }

}

export = GapsGenerator;
