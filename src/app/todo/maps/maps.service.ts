import { Injectable } from '@angular/core';
import { Distances } from './interfaces/maps.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  distances: Distances[] = [];

  addDistance() {}

  constructor() {}
}
