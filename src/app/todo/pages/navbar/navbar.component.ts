import { Component, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showDashboard: boolean = true;
  showAdd: boolean = false;
  showAddCountries: boolean = false;
  showCountries: boolean = false;
  showMap: boolean = false;
  showDistances: boolean = false;

  isAdminLogged: boolean = this.authService._isAdmin;

  show(component: string): void {
    if (component === 'dash') {
      this.showDashboard = true;
      this.showAdd = false;
      this.showAddCountries = false;
      this.showCountries = false;
      this.showMap = false;
      this.showDistances = false;
    }
    if (component === 'add') {
      this.showAdd = true;
      this.showDashboard = false;
      this.showAddCountries = false;
      this.showCountries = false;
      this.showMap = false;
      this.showDistances = false;
    }
    if (component === 'countries') {
      this.showAdd = false;
      this.showDashboard = false;
      this.showAddCountries = true;
      this.showCountries = false;
      this.showMap = false;
      this.showDistances = false;
    }
    if (component === 'data') {
      this.showAdd = false;
      this.showDashboard = false;
      this.showAddCountries = false;
      this.showCountries = true;
      this.showMap = false;
      this.showDistances = false;
    }
    if (component === 'map') {
      this.showAdd = false;
      this.showDashboard = false;
      this.showAddCountries = false;
      this.showCountries = false;
      this.showMap = true;
      this.showDistances = false;
    }
    if (component === 'distances') {
      this.showAdd = false;
      this.showDashboard = false;
      this.showAddCountries = false;
      this.showCountries = false;
      this.showMap = false;
      this.showDistances = true;
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
