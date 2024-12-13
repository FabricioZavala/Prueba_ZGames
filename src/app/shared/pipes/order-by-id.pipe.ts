import { Pipe, PipeTransform } from '@angular/core';
import { Outcome } from 'src/app/core/interfaces/sports-event.interface';

@Pipe({name: 'orderById'})
export class OrderByIdPipe implements PipeTransform {
  transform(outcomes: Outcome[]): Outcome[] {
    return outcomes.sort((a,b) => parseInt(a._id) - parseInt(b._id));
  }
}