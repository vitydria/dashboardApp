import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { TodoService } from '../../services/todo.service';
import { Cards } from 'src/app/todo/interfaces/cards.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: Cards[] = [];
  /** Based on the screen size, switch from standard to one column per row */
  colsAndRows = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return { cols: 1, rows: 1 };
      }
      return { cols: 2, rows: 1 };
    })
  );

  removeCard(id: number) {
    this.todoService.deleteCard(id).subscribe((resp) => {
      console.log('Delete resp: ', resp);
      const cardIndex = this.cards.findIndex((card) => card.id === id);
      if (cardIndex >= 0) {
        this.cards.splice(cardIndex, 1);
      }
    });
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todoService.getCard().subscribe((resp) => {
      this.cards = resp;
    });
  }
}
