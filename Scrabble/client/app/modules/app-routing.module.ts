import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GameInfoService } from '../services/game-info.service';
import { GameSelectionComponent } from '../components/game-selection.component';
import { GridComponent } from '../components/grid.component';
import { WaitComponent } from '../components/wait.component';

@Injectable()
export class PlayerNameGuard implements CanActivate {

    constructor(
        private router: Router,
        private gameInfoService: GameInfoService
    ) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        let isIdentified = this.gameInfoService.getPlayerName() !== undefined;
        if (!isIdentified) {
            this.router.navigate(['/player-name']);
        }
        return isIdentified;
    }

}

const routes: Routes = [
    { path: '', redirectTo: 'player-name', pathMatch: 'full' },
    { path: 'player-name', component: GameSelectionComponent },
    { path: 'wait', component: WaitComponent, canActivate: [PlayerNameGuard] },
    { path: 'play', component: GridComponent, canActivate: [PlayerNameGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [PlayerNameGuard]
})

export class AppRoutingModule { }
