import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  value: string = '';
  username: string = '';
  pass: string = '';

  signup(form: FormGroup) {
    console.log(form.value);
    localStorage.setItem('user', JSON.stringify(form.value));
    this.router.navigate(['']);
  }

  login(form: FormGroup) {
    for (const key in localStorage) {
      // Skip built-in properties like length, setItem, etc.
      if (localStorage.hasOwnProperty(key)) {
        this.value = localStorage.getItem(key)!;
        this.username = JSON.parse(this.value).username;
        this.pass = JSON.parse(this.value).password;
      }

      if (
        this.username === form.value.username &&
        this.pass === form.value.password
      ) {
        this.router.navigate(['/todo/dashboard']);
      }
    }
  }
}
