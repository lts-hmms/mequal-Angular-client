import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

/**
 * This service handles all the API calls to the server
 */

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://mequal.herokuapp.com/';
@Injectable({
  // tells Angular that service is available everywhere: no scoping in this case
  providedIn: 'root',
})
export class FetchApiDataService {
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * @function userRegistration
   * @service POST request to register a new user
   * @param userDetails
   * @returns A json object containing the user details
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return (
      this.http
        .post(apiUrl + 'users', userDetails)
        /*library for JS from RxJs, combines multiple functions into a single function: takes catchError as argument and will return new function */
        .pipe(catchError(this.handleError))
    );
  }

  /**
   * @function userLogin
   * @service POST request to login a user
   * @param loginDetails
   * @returns A json object containing the logged in user details
   */
  public userLogin(loginDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', loginDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * @function getAllMovies
   * @service GET request to get all movies
   * @returns A json object containing all movies
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getMovie
   * @service GET request to get a movie by title
   * @param title
   * @returns A json object containing the movie details
   */
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getDirector
   * @service GET request to get a director by name
   * @param name
   * @returns A json object containing the director details
   */
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getGenre
   * @service GET request to get a genre by name
   * @param name
   * @returns A json object containing the genre details
   */
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres' + name, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function getUser
   * @service GET request to get a user by username
   * @returns A json object containing the user details
   * @param username
   */
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .get(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function addFav
   * @service POST request to add a movie to a user's favorites
   * @param movieId
   * @returns A json object containing the user details
   */
  public addFav(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .post(
        apiUrl + 'users/' + username + '/movies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * @function removeFav
   * @service DELETE request to remove a movie from a user's favorites
   * @param movieId
   * @returns A json object containing the user details
   */
  public removeFav(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + 'users/' + username + '/movies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @function updatedUser
   * @service PATCH request to update a user's details
   * @param updatedUser
   * @returns A json object containing the updated user details
   */
  public updateUser(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .patch(apiUrl + 'users/' + username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @function deleteUser
   * @service DELETE request to delete a user
   * @returns A message confirming the user was deleted
   * @param username
   */
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  /**
   * @function extractResponseData
   * @param res
   * @returns The response data
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * @function handleError
   * @param error
   * @returns An error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.log('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return new Error('Something bad happened; please try again later.');
  }
}
