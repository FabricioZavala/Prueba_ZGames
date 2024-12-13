import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SportsEventsComponent } from './modules/sports/components/sports-events/sports-events/sports-events.component';

const routes: Routes = [
  { path: '', component: SportsEventsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
