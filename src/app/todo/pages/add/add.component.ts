import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cards } from '../../interfaces/cards.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [''],
})
export class AddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  newCard: Cards = {
    title: '',
    desc: '',
  };

  cardForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    desc: ['', [Validators.required]],
  });

  save() {
    this.newCard.title = this.cardForm.value.title;
    this.newCard.desc = this.cardForm.value.desc;

    this.todoService
      .addCard(this.newCard)
      .subscribe((res) => console.log('Res: ', res));
  }

  ngOnInit(): void {}
}
