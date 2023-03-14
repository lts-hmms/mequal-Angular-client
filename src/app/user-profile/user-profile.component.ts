import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangeUserDataDialogComponent } from '../change-user-data-dialog/change-user-data-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  user: any = {};

  username = localStorage.getItem('user');

  constructor(
    public fetchUserData: FetchApiDataService,
    public snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getUser();
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
}
