import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * The WelcomePageComponent is the landing page for users who are not logged in.
 * It provides a link to the user registration form and the user login form.
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    private router: Router,
    public snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
  handleTestuser(): void {
    console.log('testuser');
    this.fetchApiData
      .userLogin({ Username: 'testuser', Password: 'Testuser2023' })
      .subscribe(
        (result) => {
          localStorage.setItem('token', result.token);
          localStorage.setItem('username', result.user.Username);
          localStorage.setItem('user', JSON.stringify(result.user));
          this.router.navigate(['movies']);
        },
        (result) => {
          this.snackbar.open(
            'I am sorry, something went wrong. Please try again',
            'OK',
            {
              duration: 2000,
            }
          );
        }
      );
  }
}
