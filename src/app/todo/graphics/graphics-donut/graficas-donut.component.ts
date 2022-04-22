import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { map } from 'rxjs';
import { Country } from '../../interfaces/countries.interfaces';
import { TodoService } from '../../services/todo.service';

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
    this.todoService.getCountries().subscribe((countries) => {
      this.doughnutChartData.labels = countries.map(({ name }) => name);
      this.doughnutChartData.datasets[0].data = countries.map(
        ({ population }) => population
      );
    });
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {}

  ngOnInit(): void {
    this.getData();
  }

  constructor(private todoService: TodoService) {}
}
