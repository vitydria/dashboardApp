import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [LoginComponent, SignUpComponent],
  imports: [CommonModule, MaterialModule],
  exports: [LoginComponent, SignUpComponent],
})
export class AuthModule {}
