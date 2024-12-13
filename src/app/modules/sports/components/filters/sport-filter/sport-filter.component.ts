import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sport-filter',
  templateUrl: './sport-filter.component.html',
  styleUrls: ['./sport-filter.component.scss'],
})
export class SportFilterComponent {
  @Output() filterChange = new EventEmitter<string>();
  searchTerm: string = '';

  onSearchChange() {
    this.filterChange.emit(this.searchTerm);
  }
}
