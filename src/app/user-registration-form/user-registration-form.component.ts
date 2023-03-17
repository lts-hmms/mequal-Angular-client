import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// brings in the API calls
import { FetchApiDataService } from '../fetch-api-data.service';
// displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // is called once the component has received all its inputs (all its data-bound properties) from the calling component
  ngOnInit(): void {}

  // this function is responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (result) => {
        // logic for successfull user registration
        this.dialogRef.close();
        this.snackBar.open(
          'User registration successful. Please login now.',
          'OK',
          {
            duration: 2000,
          }
        );
      },
      (result) => {
        console.log(result);
        this.snackBar.open(
          'User registration failed. Please try again.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
