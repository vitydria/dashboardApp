import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { MenuComponent } from './menu/menu.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [MenuComponent, MapComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MenuComponent, MapComponent],
})
export class MapsModule {}
