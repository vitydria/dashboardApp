import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showDashboard: boolean = true;
  showAdd: boolean = false;
  showAddCountries: boolean = false;

  show(component: string): void {
    if (component === 'dash') {
      this.showDashboard = true;
      this.showAdd = false;
      this.showAddCountries = false;
    } else {
      if (component === 'add') {
        this.showAdd = true;
        this.showDashboard = false;
        this.showAddCountries = false;
      } else {
        this.showAdd = false;
        this.showDashboard = false;
        this.showAddCountries = true;
      }
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  logout() {
    this.authService.logout();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}
}
