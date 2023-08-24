import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './component/home/home.component';
import { PanelComponent } from './component/panel/panel.component';
import { TableroComponent } from './component/tablero/tablero.component';
import { BingoComponent } from './component/bingo/bingo.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PanelComponent,
    TableroComponent,
    BingoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatDividerModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
