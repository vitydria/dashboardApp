import { Country } from '../interfaces/countries.interfaces';
import { TodoService } from '../services/todo.service';

import { Component } from '@angular/core';

@Component({
  selector: 'app-graficas-table',
  templateUrl: './graficas-table.component.html',
  styleUrls: ['./graficas-table.component.scss'],
})
export class GraficasTableComponent {
  ELEMENT_DATA: Country[] = this.todoService.getItems();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.ELEMENT_DATA;
  constructor(private todoService: TodoService) {}
}
