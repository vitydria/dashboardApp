import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './pages/navbar/navbar.component';

import { MaterialModule } from '../material/material.module';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [DashboardComponent, NavbarComponent],
  imports: [CommonModule, MaterialModule, TodoRoutingModule],
})
export class TodoModule {}
