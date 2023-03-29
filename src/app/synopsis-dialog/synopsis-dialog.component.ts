import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * The SynopsisDialogComponent is responsible for displaying the movie synopsis.
 * It is called from the movie-card.component.
 */

@Component({
  selector: 'app-synopsis-dialog',
  templateUrl: './synopsis-dialog.component.html',
  styleUrls: ['./synopsis-dialog.component.scss'],
})
export class SynopsisDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Description: string;
    }
  ) {}
}
