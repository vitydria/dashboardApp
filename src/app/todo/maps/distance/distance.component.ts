import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Distances } from '../interfaces/maps.interfaces';
import { MapsService } from '../maps.service';

@Component({
  selector: 'app-distance-table',
  templateUrl: './distance.component.html',
  styleUrls: [],
})
export class DistanceComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: Distances[] = [];
  displayedColumns: string[] = ['to', 'from', 'distance (km)'];
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
    this.mapService.getDistances().subscribe((distances) => {
      this.ELEMENT_DATA = distances;
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  constructor(
    private mapService: MapsService,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
}
