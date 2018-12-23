import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {  take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    // private alertService: alertService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.auth.currentUser.pipe(
        take(1),
        map((currentUser) => !!currentUser),  // Non inverted boolean (coerces obj to bool), so true boolean. Where as a single ! is an inverted boolean.
        tap((loggedIn) => {
          if (!loggedIn) {
            alert('You must be logged in to view page.');
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          }
        })
      )
  }
}
