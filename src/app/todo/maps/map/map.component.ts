import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { environment } from 'src/environments/environment';
import { MapsService } from '../maps.service';
import { Distances } from '../interfaces/maps.interfaces';

interface Marker {
  color: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .distance-container {
        position: fixed;
        top: 130px;
        color: white;
        right: 800px;
        z-index: 999;
        background-color: black;
      }

      .btn {
        z-index: 999;
        background: blue;
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

      .marker-btn {
        color: white;
      }

      .marker-div {
        position: fixed;
        top: 130px;
        right: 60px;
        z-index: 999;
        color: white;
      }
    `,
  ],
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapsService) {}

  map!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number, number] = [-72.21477596803076, 7.7761745840835985];
  markers: Marker[] = [];
  distance: number[] = [];
  zoomOut() {
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
  }

  zoomIn() {
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom();
  }

  addMarker() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const newMarker = new mapboxgl.Marker({ draggable: true, color: color })
      .setLngLat(this.center)
      .addTo(this.map);
    this.markers.push({ color: color, marker: newMarker });
  }

  knowTheDistance() {
    const distanceArr: number[] = [];
    this.markers.forEach((value, index) => {
      if (index === 0 || index % 2 === 0) {
        const to = value.marker.getLngLat();
        const form = this.markers[index + 1]!.marker.getLngLat();

        if (form !== undefined) {
          const distance = turf.distance(
            turf.point([to.lng, to.lat]),
            turf.point([form.lng, form.lat])
          );

          distanceArr.push(distance);
          console.log(distanceArr);
        }
      }
    });
    this.distance = distanceArr;
  }

  goToMarker(marker: mapboxgl.Marker) {
    this.map.flyTo({ center: marker.getLngLat() });
  }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });
  }

  ngAfterViewInit(): void {
    this.map.on('move', (event) => {
      const target = event.target;
      this.center[0] = target.getCenter().lat;
      this.center[1] = target.getCenter().lng;
    });

    this.map.on('render', () => {
      this.knowTheDistance();
    });
  }
}
