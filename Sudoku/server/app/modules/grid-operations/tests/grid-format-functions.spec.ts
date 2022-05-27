import * as gridFormatFunctions from '../grid-format-functions';
import { expect } from 'chai';

describe('Grid model operations tests', () => {

    it('should convert the strings into a grid', done => {
        let stringsToConvert = ["1,2,3", "4,5,6", "7,8,9"];
        let expectedGrid =
            [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
            ];
        let actualResult = gridFormatFunctions.stringsToGrid(stringsToConvert);
        for (let i = 0; i < expectedGrid.length; i++) {
            for (let j = 0; j < expectedGrid.length; j++) {
                expect(actualResult[i][j] === expectedGrid[i][j]).to.equal(true);
            }
        }
        done();
    });

    it('should compare 2 grids', done => {
        let firstGrid =
            [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
            ];
        let secondGrid =
            [[1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
            ];

        expect(gridFormatFunctions.compareGrids(firstGrid, secondGrid)).to.equal(true);
        secondGrid[0][0] = 4;
        expect(gridFormatFunctions.compareGrids(firstGrid, secondGrid)).to.equal(false);
        done();
    });

});
