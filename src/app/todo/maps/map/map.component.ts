import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: black;
        color: white;
        bottom: 30px;
        left: 300px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        font-family: 'Roboto';
        border-radius: 5px;
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  constructor() {}

  map!: mapboxgl.Map;

  zoomOut() {
    this.map.zoomOut();
  }

  zoomIn() {
    this.map.zoomIn();
  }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.21477596803076, 7.7761745840835985],
      zoom: 16,
    });
  }
}
