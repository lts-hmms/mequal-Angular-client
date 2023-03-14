import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  // directors: any[] = [];
  faves: any[] = [];

  constructor(
    public fetchData: FetchApiDataService,
    public snackBar: MatSnackBar
  ) {}

  // same logic as componentDidMount in react
  ngOnInit(): void {
    this.getMovies();
    this.getFaves();
    // let directorsNames = this.movies.map((movie) => {
    //   return movie.Directors.map((director: any) => director.Name);
    // });

    // console.log(directorsNames);
  }

  getMovies(): void {
    this.fetchData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFaves(): void {
    this.fetchData.getUser().subscribe((res: any) => {
      this.faves = res.Favslist;
      console.log(this.faves);
      return this.faves;
    });
  }

  toggleFav(id: string): void {
    console.log('toggle reached');
    if (!this.faves.includes(id)) {
      this.fetchData.addFav(id).subscribe(
        (res) => {
          this.faves = res.Favslist;
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
          this.faves = res.Favslist;
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
}
