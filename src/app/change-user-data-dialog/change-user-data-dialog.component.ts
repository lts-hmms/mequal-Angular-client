import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-user-data-dialog',
  templateUrl: './change-user-data-dialog.component.html',
  styleUrls: ['./change-user-data-dialog.component.scss'],
})
export class ChangeUserDataDialogComponent {
  // decorator
  @Input() userData = { Email: '', Password: '' };

  constructor(
    public fetchUpdateUser: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ChangeUserDataDialogComponent>
  ) {}

  updateUser(): void {
    this.fetchUpdateUser.updateUser(this.userData).subscribe(
      (result) => {
        this.dialogRef.close();
        this.snackBar.open('User profile updated', 'OK', {
          duration: 2000,
        });
        window.location.reload();
      },
      (result) => {
        console.log(result);
        this.snackBar.open('Profile update failed. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
