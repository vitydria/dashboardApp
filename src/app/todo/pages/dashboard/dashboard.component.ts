import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Cards } from 'src/app/todo/interfaces/cards.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: Cards[] = [];

  @ViewChild('title') title: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  id: number = -1;

  getTitle() {
    return this.title.nativeElement.value;
  }

  getDesc() {
    return this.desc.nativeElement.value;
  }

  editCard(id: number) {
    this.id = id;
  }

  updateCard(card: Cards): void {
    this.id = -1;
    card.title = this.getTitle();
    card.desc = this.getDesc();
    this.todoService.updateCard(card).subscribe((resp) => {
      console.log('Resp'), resp;
    });
  }

  removeCard(id: number) {
    this.todoService.deleteCard(id).subscribe((resp) => {
      const cardIndex = this.cards.findIndex((card) => card.id === id);
      if (cardIndex >= 0) {
        this.cards.splice(cardIndex, 1);
      }
    });
  }

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getCard().subscribe((resp) => {
      this.cards = resp;
    });
  }
}
