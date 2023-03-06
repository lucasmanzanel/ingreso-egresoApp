import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((isAuth) => {
        console.log('ESTO',isAuth)
        if (!isAuth) this.router.navigate(['login']);
      })
    );
  }

  
}
