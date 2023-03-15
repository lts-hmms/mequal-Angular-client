import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  directors: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user') || '') || {};
  public isSlideChecked: boolean = false;
  public toggleEvents: string[] = [];

  constructor(
    public fetchData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  // same logic as componentDidMount in react
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  showFaves($event: MatSlideToggleChange): void {
    this.isSlideChecked = $event.checked;
    console.log(this.isSlideChecked);
  }

  toggleFav(id: string): void {
    console.log('toggle reached');
    if (!this.user.Favslist.includes(id)) {
      this.fetchData.addFav(id).subscribe(
        (res) => {
          this.user = res;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.snackBar.open('Movie added to faves.', 'OK', {
            duration: 3000,
          });
        },
        (res) => {
          console.log(res);
          this.snackBar.open(res.message, 'OK', {
            duration: 3000,
          });
        }
      );
    } else {
      this.fetchData.removeFav(id).subscribe(
        (res) => {
          this.user = res;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.snackBar.open('Movie removed from faves.', 'OK', {
            duration: 3000,
          });
        },
        (res) => {
          this.snackBar.open(res.message, 'OK', {
            duration: 3000,
          });
        }
      );
    }
  }

  openDirectorDialog(): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '480px',
    });
  }
  openGenreDialog(): void {
    this.dialog.open(GenreDialogComponent, {
      width: '480px',
    });
  }
  openSynopsisDialog(): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '480px',
    });
  }
}
