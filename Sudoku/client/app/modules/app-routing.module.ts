import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GridComponent } from '../components/grid.component';
import { GameSelectionComponent } from '../components/game-selection.component';

const routes: Routes = [
  { path: '', redirectTo: 'game-selection', pathMatch: 'full' },
  { path: 'game-selection', component: GameSelectionComponent },
  { path: 'play', component: GridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
