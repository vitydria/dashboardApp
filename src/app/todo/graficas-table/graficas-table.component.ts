import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Country } from '../interfaces/countries.interfaces';
import { TodoService } from '../services/todo.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-graficas-table',
  templateUrl: './graficas-table.component.html',
  styleUrls: ['./graficas-table.component.scss'],
})
export class GraficasTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'name',
    'abbreviation',
    'population',
    'continent',
  ];
  ELEMENT_DATA: Country[] = this.todoService.getItems();
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private todoService: TodoService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
}
