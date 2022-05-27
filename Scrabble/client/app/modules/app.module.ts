import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from '../components/app.component';
import { GridComponent } from '../components/grid.component';
import { GameSelectionComponent } from '../components/game-selection.component';
import { GameInfoService } from '../services/game-info.service';

import { GridService } from '../services/grid.service';
import { SocketService } from '../services/socket.service';
import { ChatComponent } from '../components/chat.component';
import { GameStatusComponent } from '../components/game-status.component';

import { SupportComponent } from '../components/support.component';
import { WaitComponent } from '../components/wait.component';
import { SelectionService } from '../services/selection.service';
import { SupportService } from '../services/support.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],

  declarations: [
    AppComponent,
    GameSelectionComponent,
    GridComponent,
    ChatComponent,
    SupportComponent,
    GameStatusComponent,
    WaitComponent
  ],

  providers: [
    GridService,
    GameInfoService,
    SocketService,
    SelectionService,
    SupportService
  ],

  bootstrap: [ AppComponent ]
})

export class AppModule { }
