import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';

@Injectable()
export class GetGridService {
    constructor(private http_: Http, private router_: Router) { }

    public getEasyGrid() {
        const EASY_GRID_URL = "http://localhost:3002/sudoku-easy";
        return this.httpGetRequest(EASY_GRID_URL);
    }

    public getHardGrid() {
        const HARD_GRID_URL = 'http://localhost:3002/sudoku-hard';
        return this.httpGetRequest(HARD_GRID_URL);
    }

    public checkSolution(grid: any) {
        const GRID_VERIFICATION_URL = 'http://localhost:3002/sudoku-verification';
        return this.httpPostRequest(GRID_VERIFICATION_URL, grid);
    }
    private httpGetRequest(urlRequest: string) {
        return this.http_.get(urlRequest).map((res: Response) => {
            return res.json() || {};
        });
    }

    private httpPostRequest(urlRequest: string, item: any) {
        return this.http_.post(urlRequest, { item }).map((res: Response) => {
            return res.json() || {};
        });
    }
}
