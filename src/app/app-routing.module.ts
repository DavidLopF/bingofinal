import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BingoComponent } from './component/bingo/bingo.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  { path: 'bingo', component: BingoComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
