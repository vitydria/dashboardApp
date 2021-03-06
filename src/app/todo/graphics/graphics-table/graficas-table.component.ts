import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Country } from '../../interfaces/countries.interfaces';
import { TodoService } from '../../services/todo.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-graficas-table',
  templateUrl: './graficas-table.component.html',
  styleUrls: [],
})
export class GraficasTableComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: Country[] = [];
  displayedColumns: string[] = [
    'name',
    'abbreviation',
    'population',
    'continent',
  ];
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.displayedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }
  dataSource = new MatTableDataSource();
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.todoService.getCountries().subscribe((resp) => {
      this.ELEMENT_DATA = resp;
      this.dataSource.data = resp;
    });
  }

  constructor(
    private todoService: TodoService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
}
