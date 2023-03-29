/**
 * This service is used to check if the user is logged in or not.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor() {}
  getToken() {
    return !!localStorage.getItem('username');
  }
}
