import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SportsEventsComponent } from './components/sports-events/sports-events/sports-events.component';
import { SportFilterComponent } from './components/filters/sport-filter/sport-filter.component';
import { BetSlipComponent } from './components/form/bet-slip/bet-slip.component';
import { FormsModule } from '@angular/forms';
import { OrderByIdPipe } from 'src/app/shared/pipes/order-by-id.pipe';

@NgModule({
  declarations: [
    SportsEventsComponent, 
    SportFilterComponent, 
    BetSlipComponent,
    OrderByIdPipe
],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [SportsEventsComponent],
})
export class SportsModule {}
