import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide: boolean = true;
  signupForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    firstname: ['', [Validators.required, Validators.minLength(3)]],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  isValid(field: string) {
    return (
      this.signupForm.controls[field].errors &&
      this.signupForm.controls[field].touched
    );
  }

  submit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      console.log(this.signupForm.value);
      return;
    }

    this.authService.signup(this.signupForm);
    this.signupForm.reset();
  }
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
}
