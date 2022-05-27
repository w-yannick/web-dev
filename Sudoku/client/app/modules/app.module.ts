import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../components/app.component';
import { GameSelectionComponent } from '../components/game-selection.component';
import { GridComponent } from '../components/grid.component';
import { GetGridService } from '../services/get-grid.service';
import { GameStatusService } from '../services/game-status.service';
import { TimerService } from '../services/timer.service';
import { SelectedCellService } from '../services/selected-cell.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        GridComponent,
        GameSelectionComponent
    ],
    providers: [
        GetGridService,
        GameStatusService,
        TimerService,
        SelectedCellService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
