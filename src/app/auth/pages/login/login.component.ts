import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /* loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  }); */

  hide: boolean = true;
  notLogin = false;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]],
  });

  isValid(field: string) {
    return (
      this.loginForm.controls[field].errors &&
      this.loginForm.controls[field].touched
    );
  }

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm);

    this.notLogin = true;

    this.loginForm.reset();
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)!.setErrors(null);
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
}
