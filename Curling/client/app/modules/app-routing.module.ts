import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GlComponent } from '../components/gl.component';
import { GameSelectionComponent } from '../components/game-selection.component';
import { GameInfoService } from '../services/game-info.service';


@Injectable()
export class PlayRouteGuard implements CanActivate {

    constructor(
        private router: Router,
        private gameInfoService: GameInfoService
    ) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        let isIdentified = this.gameInfoService.getPlayerName() !== undefined;
        if (!isIdentified) {
            this.router.navigate(['/game-selection']);
        }
        return isIdentified;
    }

}

const routes: Routes = [
    { path: '', redirectTo: 'game-selection', pathMatch: 'full' },
    { path: 'play', component: GlComponent, canActivate: [PlayRouteGuard] },
    { path: 'game-selection', component: GameSelectionComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [PlayRouteGuard]
})

export class AppRoutingModule { }
