module GridFormatFunctions {

    export function stringsToGrid(strings: string[]): number[][] {
        let grid: number[][] = [];
        for (let i = 0; i < strings.length; i++) {
            let row: string[] = strings[i].split(",");
            grid[i] = [];
            for (let j = 0; j < row.length; j++) {
                grid[i][j] = Number.parseInt(row[j]);
            }
        }
        return grid;
    }

    export function compareGrids(grid1: number[][], grid2: number[][]): boolean {
        let areEquals = true;
        for (let i = 0; i < grid1.length; i++) {
            for (let j = 0; j < grid1.length; j++) {
                if ((Number)(grid1[i][j]) !== (Number)(grid2[i][j])) {
                    areEquals = false;
                    break;
                }
            }
        }
        return areEquals;
    }

}

export = GridFormatFunctions;
