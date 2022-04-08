import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
=======
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

>>>>>>> dee997b597972b9f0361814724e8c89e773a04bf
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HomeComponent } from './shared/home/home.component';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent, HomeComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    AuthModule,
    AppRoutingModule,
<<<<<<< HEAD
    HttpClientModule,
=======
>>>>>>> dee997b597972b9f0361814724e8c89e773a04bf
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
