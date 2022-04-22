import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cards } from '../interfaces/cards.interface';
import { Country } from '../interfaces/countries.interfaces';
import { interval, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:3000/countries');
  }

  addCountries(country: Partial<Country[]>): void {
    country.forEach(async (value) => {
      await firstValueFrom(
        this.http.post<Country>('http://localhost:3000/countries', value)
      );
    });
  }

  addCard(card: Partial<Cards>): Observable<Cards> {
    return this.http.post<Cards>('http://localhost:3000/todo', card);
  }

  updateCard(card: Cards): Observable<Cards> {
    return this.http.put<Cards>(`http://localhost:3000/todo/${card.id}`, card);
  }

  getCard(): Observable<Cards[]> {
    return this.http.get<Cards[]>('http://localhost:3000/todo');
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/todo/${id}`);
  }
}
