import { Component } from '@angular/core';

/**
 * The NavbarComponent is responsible for the navigation bar at the top of the page.
 * It contains a link to the user profile page and a logout button.
 *
 */

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  onLogout(): void {
    localStorage.clear();
  }
}
