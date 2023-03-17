import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUserDataDialogComponent } from '../change-user-data-dialog/change-user-data-dialog.component';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';

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

  getUser(): void {
    this.fetchUserData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
    });
  }

  openUserChangeDataDialog(): void {
    this.dialog.open(ChangeUserDataDialogComponent, {
      width: '280px',
    });
  }

  // openDeleteUserDialog(): void {
  //   this.dialog.open(DeleteAccountDialogComponent, {
  //     width: '550px',
  //   });
  // }
}
