import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from '../components/app.component';
import { GlComponent } from '../components/gl.component';
import { GameSelectionComponent } from '../components/game-selection.component';

import { CollisionService } from '../services/collision.service';
import { BroomService } from '../services/broom.service';
import { GameInfoService } from '../services/game-info.service';
import { GameService } from '../services/game.service';
import { HudService } from '../services/hud.service';
import { RenderService } from '../services/render.service';
import { ScoringService } from '../services/scoring.service';
import { StoneThrowingService } from '../services/stone-throwing.service';
import { HighScoresService } from '../services/high-scores.service';
import { IlluminationService } from '../services/illumination.service';

import { MaterialModule } from '@angular/material';

export let appInjector: Injector;

@NgModule({
    imports: [BrowserModule, FormsModule, AppRoutingModule, MaterialModule.forRoot()],
    declarations: [
        AppComponent,
        GameSelectionComponent,
        GlComponent
    ],
    providers: [
        BroomService,
        CollisionService,
        GameInfoService,
        GameService,
        HudService,
        RenderService,
        ScoringService,
        StoneThrowingService,
        HighScoresService,
        IlluminationService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private injector: Injector) {
        appInjector = this.injector;
    }
}
