import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sport-filter',
  templateUrl: './sport-filter.component.html',
  styleUrls: ['./sport-filter.component.scss'],
})
export class SportFilterComponent {
  @Output() filterChange = new EventEmitter<{
    evento?: string;
    local?: string;
    visitante?: string;
    torneo?: string;
    fecha?: string;
    estado?: string;
  }>();

  filters = {
    evento: '',
    local: '',
    visitante: '',
    torneo: '',
    fecha: '',
    estado: '',
  };

  // Emitir los filtros actuales
  onSearch() {
    this.filterChange.emit({ ...this.filters });
  }

  // Restablecer todos los filtros y emitir el cambio
  onReset() {
    this.filters = {
      evento: '',
      local: '',
      visitante: '',
      torneo: '',
      fecha: '',
      estado: '',
    };
    this.filterChange.emit(this.filters);
  }
}
