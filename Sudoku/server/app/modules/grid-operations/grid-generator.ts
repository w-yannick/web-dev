/*
 * Generates a grid with gaps.
 */
import * as completedGridGenerator from './completed-grid-generator';
import * as gapsGenerator from './gaps-generator';
import * as gridOperations from './grid-operations';

module GridGenerator {

    const DIGITS_TO_DELETE_EASY_MODE = 35;
    const DIGITS_TO_DELETE_HARD_MODE = 48;

    export function easyModeGrid(): Object {
        let grid = completedGridGenerator.generate();
        let completeGrid = gridOperations.cloneGrid(grid);

        gapsGenerator.deleteDigits(grid, DIGITS_TO_DELETE_EASY_MODE);

        return { completeGrid: completeGrid, gappedGrid: grid };
    }

    export function hardModeGrid(): Object {
        let grid = completedGridGenerator.generate();
        let completeGrid = gridOperations.cloneGrid(grid);

        gapsGenerator.deleteDigits(grid, DIGITS_TO_DELETE_HARD_MODE);

        return { completeGrid: completeGrid, gappedGrid: grid };
    }

}

export = GridGenerator;
