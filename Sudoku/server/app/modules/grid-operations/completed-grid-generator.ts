/*
 * Generates a complete random grid.
 */

import * as gridOperations from './grid-operations';

module CompletedGridGenerator {

    const AVAILABLE_OPERATIONS = 5;
    const PERMUTATION_NUMBER = 200;
    const GENUINE_GRID = [
        [9, 2, 7, 4, 5, 6, 1, 3, 8],
        [3, 5, 8, 1, 7, 2, 6, 9, 4],
        [1, 6, 4, 3, 9, 8, 7, 2, 5],
        [4, 1, 3, 5, 2, 7, 8, 6, 9],
        [8, 7, 2, 9, 6, 1, 4, 5, 3],
        [5, 9, 6, 8, 4, 3, 2, 7, 1],
        [2, 3, 5, 7, 8, 4, 9, 1, 6],
        [6, 4, 1, 2, 3, 9, 5, 8, 7],
        [7, 8, 9, 6, 1, 5, 3, 4, 2]
    ];

    export function generate(): number[][] {

        let grid: number[][] = gridOperations.cloneGrid(GENUINE_GRID);

        // 5 seconds delay simulation to change for an asynchronous one
        let possibleOperations = [
            gridOperations.swapTwoRandomColumns,
            gridOperations.swapTwoRandomRows,
            gridOperations.reverseColumns,
            gridOperations.reverseRows,
            gridOperations.reverseDiagonally
        ];
        for (let i = 0; i < PERMUTATION_NUMBER; i++) {
            let index = Math.floor(Math.random() * AVAILABLE_OPERATIONS);
            possibleOperations[index](grid); // random operation
        }

        return grid;
    }

}

export = CompletedGridGenerator;
