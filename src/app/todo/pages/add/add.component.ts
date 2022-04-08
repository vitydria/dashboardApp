import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cards } from '../../interfaces/cards.interface';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      .errors {
        font-size: smaller;
        color: rgb(255, 48, 48);
        align-self: flex-start;
      }
    `,
  ],
})
export class AddComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
  ) {}

  newCard: Partial<Cards> = {
    title: '',
    desc: '',
  };

  cardForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    desc: ['', [Validators.required]],
  });

  isValid(field: string) {
    return (
      this.cardForm.controls[field].errors &&
      this.cardForm.controls[field].touched
    );
  }

  submit() {
    if (this.cardForm.invalid) {
      this.cardForm.markAllAsTouched();
      return;
    }

    this.newCard.title = this.cardForm.value.title;
    this.newCard.desc = this.cardForm.value.desc;

    this.cardForm.reset();
    this.cardForm.markAsUntouched();

    this.todoService
      .addCard(this.newCard)
      .subscribe((res) => console.log('Res: ', res));

    this.cardForm.reset();
    Object.keys(this.cardForm.controls).forEach((key) => {
      this.cardForm.get(key)!.setErrors(null);
    });
  }

  ngOnInit(): void {}
}
