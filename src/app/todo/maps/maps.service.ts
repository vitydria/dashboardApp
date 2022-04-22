import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Distances } from './interfaces/maps.interfaces';
import { HttpClient } from '@angular/common/http';
import { interval, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  distances: Distances[] = [];

  constructor(private http: HttpClient) {}

  getDistances(): Observable<Distances[]> {
    return this.http.get<Distances[]>('http://localhost:3000/distances');
  }

  addDistances(country: Partial<Distances[]>): void {
    country.forEach(async (value) => {

      await firstValueFrom(
        this.http.post<Distances>('http://localhost:3000/distances', value)
      );
    });
  }
}
