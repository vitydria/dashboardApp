import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [DashboardComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule],
  exports: [DashboardComponent],
})
export class SharedModule {}
