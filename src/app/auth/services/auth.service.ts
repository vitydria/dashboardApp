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
  _auth: boolean = false;

  signup(form: FormGroup) {
    const idUser = Math.floor(Math.random() * (999 - 1)) + 1;
    localStorage.setItem(`user/${idUser}`, JSON.stringify(form.value));
    this.router.navigate(['']);
  }

  login(form: FormGroup) {
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        this.value = localStorage.getItem(key);
        this.username = JSON.parse(this.value).username;
        this.pass = JSON.parse(this.value).password;
      }

      if (
        this.username === form.value.username &&
        this.pass === form.value.password
      )
        this._auth = true;
    }
    console.log(this._auth);
    this.router.navigate(['/todo/dashboard']);
  }

  logout() {
    this._auth = false;
    this.router.navigate(['']);
  }
}
