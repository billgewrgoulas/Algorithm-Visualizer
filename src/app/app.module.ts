import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { GridComponent } from './grid/grid.component';
import { ObserversService } from './services/observers.service';
import { MazesService } from './services/mazes.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PathfindService } from './services/pathfind.service';
import { TopKService } from './services/top-k.service';

@NgModule({
  declarations: [AppComponent, TopbarComponent, GridComponent],
  imports: [BrowserModule, AppRoutingModule, DragDropModule],
  providers: [ObserversService, MazesService, PathfindService, TopKService],
  bootstrap: [AppComponent],
})
export class AppModule {}
