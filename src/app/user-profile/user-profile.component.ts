import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUserDataDialogComponent } from '../change-user-data-dialog/change-user-data-dialog.component';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

/**
 * The UserProfileComponent is the landing page for users who are logged in.
 *  It displays the user's profile information.
 */

export interface DialogData {
  delete: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: any = {};
  delete!: string;

  constructor(
    public fetchUserData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getUser();
  }

  /**
   * This function opens a dialog window that asks the user to confirm the deletion of their profile and
   * @function openDeleteUserDialog
   * @returns A dialog window that asks the user to confirm the deletion of their profile.
   * @param delete
   */
  openDeleteUserDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccountDialogComponent, {
      data: { delete: this.delete },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.delete = result;
      if (this.delete == 'DELETE') {
        this.deleteAccount();
      } else {
        this.snackBar.open(`Profile was NOT deleted.`, 'OK');
      }
    });
  }

  /**
   * @function deleteAccount
   * @returns A confirmation message that the user's profile has been deleted.
   * @returns An error message if the user's profile could not be deleted.
   * @param delete
   */
  deleteAccount() {
    this.fetchUserData.deleteUser().subscribe(
      (result) => {
        this.snackBar.open('User account deleted ', 'OK', {
          duration: 2000,
        });
        localStorage.clear();
        window.location.reload();
      },
      (result) => {
        console.log(result);
        this.snackBar.open(
          `Profile couldn't be deleted. Please try again.`,
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }

  /**
   * @function getUser
   * @returns The user's profile information.
   */
  getUser(): void {
    this.fetchUserData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
    });
  }

  /**
   * This function opens a dialog window that allows the user to update their profile information.
   */
  openUserChangeDataDialog(): void {
    this.dialog.open(ChangeUserDataDialogComponent, {
      width: '280px',
    });
  }
}
