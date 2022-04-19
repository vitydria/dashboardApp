import { Component } from '@angular/core';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss'],
})
export class GraficasComponent {
  table: boolean = true;
  bar: boolean = false;
  donut: boolean = false;

  barSelect() {
    this.bar = true;
    this.donut = false;
    this.table = false;
  }

  donutSelect() {
    this.donut = true;
    this.bar = false;
    this.table = false;
  }

  tableSelect() {
    this.donut = false;
    this.bar = false;
    this.table = true;
  }

  constructor() {}
}
