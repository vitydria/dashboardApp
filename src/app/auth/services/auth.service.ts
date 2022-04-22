import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  value: any = {};
  username: string = '';
  pass: string = '';
  _auth: boolean = false;
  _isAdmin: boolean = true;

  signup(form: FormGroup) {
    const idUser = Math.floor(Math.random() * (999 - 1)) + 1;
    localStorage.setItem(`user/${idUser}`, JSON.stringify(form.value));
    this.router.navigate(['']);
  }

  login(form: FormGroup) {
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        if (
          key !== 'mapbox.eventData.uuid:dml0eWRyaWE=' &&
          key !== 'mapbox.eventData:dml0eWRyaWE='
        ) {
          this.value = localStorage.getItem(key);
          this.username = JSON.parse(this.value).username;
          this.pass = JSON.parse(this.value).password;
        }

        if (
          this.username === form.value.username &&
          this.pass === form.value.password
        ) {
          this._auth = true;
        }
      }
    }

    if (form.value.username === 'Vic' && form.value.password === '123Al-rex') {
      this._isAdmin = true;
    }

    this.router.navigate(['/todo/dashboard']);
  }

  logout() {
    this._auth = false;
    this._isAdmin = false;
    this.router.navigate(['']);
  }
}
