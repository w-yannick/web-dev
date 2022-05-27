/*
 * Possible operations on grids.
 */

module GridOperations {

    const NUMBER_OF_COLUMNS = 9;
    const NUMBER_OF_ROWS = 9;
    const NUMBER_OF_SQUARES = 3;

    export function cloneGrid(initialGrid: number[][]): number[][] {
        return initialGrid.map(function (gridToCopy) {
            return gridToCopy.slice();
        });
    }

    function twoRandomsGenerator(): number[] {
        // Express randomSquare according to the first row/column of the box (0, 1 or 2) randomly generated
        let randomBox = (Math.floor(Math.random() * NUMBER_OF_SQUARES)) * 3;
        let firstRandomNumber = Math.floor(Math.random() * NUMBER_OF_SQUARES);
        let secondRandomNumber = (firstRandomNumber + Math.floor(
            Math.random() * (NUMBER_OF_SQUARES - 1)) + 1) % NUMBER_OF_SQUARES;
        return [(firstRandomNumber + randomBox), (secondRandomNumber + randomBox)];
    }

    export function swapTwoColumns(grid: number[][], firstArray: number, secondArray: number): void {
        for (let i = 0; i < grid.length; i++) { // swap
            grid[i][secondArray] = [grid[i][firstArray], grid[i][firstArray] = grid[i][secondArray]][0];
        }
    }

    export function swapTwoRows(grid: number[][], firstArray: number, secondArray: number): void {
        for (let i = 0; i < NUMBER_OF_ROWS; i++) { // swap
            grid[secondArray] = [grid[firstArray], grid[firstArray] = grid[secondArray]][0];
        }
    }

    export function swapTwoRandomColumns(grid: number[][]): void {
        let firstColumn, secondColumn;
        [firstColumn, secondColumn] = twoRandomsGenerator();
        swapTwoColumns(grid, firstColumn, secondColumn);
    }

    export function swapTwoRandomRows(grid: number[][]): void {
        let firstRow, secondRow;
        [firstRow, secondRow] = twoRandomsGenerator();
        swapTwoRows(grid, firstRow, secondRow);
    }

    export function reverseColumns(grid: number[][]): void {
        for (let i = 0; i < (grid.length + 1) / 2; i++) {
            swapTwoColumns(grid, i, NUMBER_OF_COLUMNS - 1 - i);
        }
    }

    export function reverseRows(grid: number[][]): void {
        for (let i = 0; i < (NUMBER_OF_ROWS + 1) / 2; i++) {
            swapTwoRows(grid, i, NUMBER_OF_ROWS - 1 - i);
        }
    }

    export function reverseDiagonally(grid: number[][]): void {
        for (let i = 0; i < NUMBER_OF_ROWS; i++) {
            for (let j = 0; j < i; j++) { // swap
                grid[j][i] = [grid[i][j], grid[i][j] = grid[j][i]][0];
            }
        }
    }

}

export = GridOperations;
