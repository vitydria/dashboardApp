import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { TodoService } from '../../services/todo.service';

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

  public barChartData: ChartData<'bar'> = {
    labels: ['Population'],
    datasets: [this.data],
  };

  getData() {
    const loadData = this.todoService.getItems();
    this.data = loadData.map(({ name, population }) => ({
      data: [population],
      label: name,
    }));
    this.barChartData.datasets = this.data;
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    this.getData();
  }

  constructor(private todoService: TodoService) {}
}
