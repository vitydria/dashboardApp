import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { TodoService } from '../../services/todo.service';
import { map } from 'rxjs/operators';
import { Country } from '../../interfaces/countries.interfaces';

@Component({
  selector: 'app-graficas-bar',
  templateUrl: './graficas-bar.component.html',
  styleUrls: ['./graficas-bar.component.scss'],
})
export class GraficasBarComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  data: any = [];
  isLoad: boolean = false;

  public barChartData: ChartData<'bar'> = {
    labels: ['Population'],
    datasets: [this.data],
  };

  getData() {
    this.todoService
      .getCountries()
      .pipe(
        map((countries) => {
          return countries.map(({ population, name }) => ({
            data: [population],
            label: name,
          }));
        })
      )
      .subscribe((chartData) => {
        this.barChartData.datasets = chartData;
        this.isLoad = true;
      });
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  ngOnInit(): void {
    this.getData();
  }

  constructor(private todoService: TodoService) {}
}
