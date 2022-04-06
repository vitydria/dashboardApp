import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AddComponent } from './pages/add/add.component';

import { MaterialModule } from '../material/material.module';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent, AddComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TodoRoutingModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {}