import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-graficas-donut',
  templateUrl: './graficas-donut.component.html',
  styleUrls: ['./graficas-donut.component.scss'],
})
export class GraficasDonutComponent implements OnInit {
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };
  public doughnutChartType: ChartType = 'doughnut';

  getData() {
    let labels = [];
    let data = [];
    const loadData = this.todoService.getItems();
    labels = loadData.map(({ name }) => name);
    data = loadData.map(({ population }) => population);
    console.log(data);
    this.doughnutChartLabels = labels;
    this.doughnutChartData.datasets[0].data = data;
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  constructor(private todoService: TodoService) {}
  ngOnInit(): void {
    this.getData();
  }
}
