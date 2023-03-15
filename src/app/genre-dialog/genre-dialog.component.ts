import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss'],
})
export class GenreDialogComponent {
  genresArr: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      genresArr: any;
      Name: string;
      Description: string;
    }
  ) {
    console.log(data.genresArr);
  }
}
