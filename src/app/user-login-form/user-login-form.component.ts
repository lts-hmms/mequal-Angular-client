import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * This component contains the logic for the user login form.
 */

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackbar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {}

  /**
   * This is the function responsible for sending the form inputs to the backend, returning a user login and token. It also stores the user login and token in local storage. It then navigates the user to the movies view.
   * @returns User login
   * @param userData
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('username', result.user.Username);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.dialogRef.close();
        this.snackbar.open('Login successful', 'OK', {
          duration: 2000,
        });
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
