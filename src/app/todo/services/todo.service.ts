import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cards } from '../interfaces/cards.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  addCard(card: Partial<Cards>): Observable<Cards> {
    return this.http.post<Cards>('http://localhost:3000/todo', card);
  }

  getCard(): Observable<Cards[]> {
    return this.http.get<Cards[]>('http://localhost:3000/todo');
  }

  deleteCard(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/todo/${id}`);
  }
}
