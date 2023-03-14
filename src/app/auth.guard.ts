import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthguardService } from './authguard.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private AuthguardService: AuthguardService,
    private router: Router
  ) {}
  canActivate(): boolean {
    if (!this.AuthguardService.getToken()) {
      this.router.navigateByUrl('welcome');
    }
    return this.AuthguardService.getToken();
  }
}
