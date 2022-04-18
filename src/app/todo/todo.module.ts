import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material/material.module';
import { TodoRoutingModule } from './todo-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AddComponent } from './pages/add/add.component';
import { AddCountriesComponent } from './pages/add-countries/add-countries.component';
import { GraficasComponent } from './graficas/graficas.component';
import { GraficasBarComponent } from './graficas-bar/graficas-bar.component';
import { GraficasDonutComponent } from './graficas-donut/graficas-donut.component';
import { GraficasTableComponent } from './graficas-table/graficas-table.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NavbarComponent,
    AddComponent,
    AddCountriesComponent,
    GraficasComponent,
    GraficasBarComponent,
    GraficasDonutComponent,
    GraficasTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    NgChartsModule,
  ],
})
export class TodoModule {}
