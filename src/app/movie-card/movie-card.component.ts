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
  allMovies: any[] = [];
  user: any = JSON.parse(localStorage.getItem('user') || '') || {};
  showFaves: boolean = false;

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
      this.allMovies = res;
      console.log(this.movies);
      return this.movies;
    });
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

  onShowFavesChange(): void {
    this.movies = this.showFaves
      ? this.movies.filter((movie) => this.user.Favslist.includes(movie._id))
      : this.allMovies;
  }

  openDirectorDialog(name: string, birthyear: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      data: {
        Name: name,
        Birthyear: birthyear,
        Bio: bio,
      },
      width: '550px',
    });
  }
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '550px',
    });
  }
  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: {
        Description: description,
      },
      width: '550px',
    });
  }
}
