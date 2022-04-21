import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cards } from '../interfaces/cards.interface';
import { Country } from '../interfaces/countries.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  countries: Country[] = [
    {
      name: 'España',
      abbreviation: 'ES',
      population: 243143253,
      continent: 'Europa',
    },
    {
      name: 'Francia',
      abbreviation: 'FR',
      population: 93423253,
      continent: 'Europa',
    },
  ];

  addCountries(ct: Country[]) {
    ct.forEach((country) => {
      this.countries.push(country);
    });

    console.log(this.countries);
  }

  addCountry(country: Partial<Country>): Observable<Cards> {
    return this.http.post<Cards>('http://localhost:3000/todo', country);
  }

  getItems() {
    return this.countries;
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
