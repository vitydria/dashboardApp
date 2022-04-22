import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';
import { DistanceComponent } from './distance/distance.component';

@NgModule({
  declarations: [MenuComponent, MapComponent, DistanceComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MenuComponent, MapComponent, DistanceComponent],
})
export class MapsModule {}
