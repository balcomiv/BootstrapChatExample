import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsOwnerGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.currentUser.pipe(
      take(1),
      map(currentUser => !!currentUser && currentUser.id === next.params.userId),
      tap(isOwner => {
        if (!isOwner) {
          alert(`You can only edit your own profile!`);
          this.router.navigate(['/login'], {queryParams: { returnUrl: state.url }})
        }
      })
    )
  }
}
