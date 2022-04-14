import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ConfirmedValidator } from '../helpers/confirmed.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide: boolean = true;
  signupForm: FormGroup = this.formBuilder.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
          ),
        ],
      ],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: ConfirmedValidator('password', 'confirmPassword'),
    }
  );

  isValid(field: string) {
    return (
      this.signupForm.controls[field].errors &&
      this.signupForm.controls[field].touched
    );
  }

  isPasswordValid(): string {
    if (this.signupForm.controls['password'].errors['required'])
      return 'Password is required';

    if (this.signupForm.controls['password'].errors['pattern'])
      return 'Password must include a number, a special character, one uppercase, one lowercarse, and at least 8 characters';

    return '';
  }

  confirmPassword(): string {
    if (this.signupForm.controls['confirmPassword'].errors['required'])
      return 'Confirm password';
    if (
      this.signupForm.controls['confirmPassword'].errors['confirmedValidator']
    )
      return 'Password and confirm password must be match';
    return '';
  }

  submit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.authService.signup(this.signupForm);
    console.log(this.signupForm.value);
    this.signupForm.reset();

    Object.keys(this.signupForm.controls).forEach((key) => {
      this.signupForm.get(key)!.setErrors(null);
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
}
