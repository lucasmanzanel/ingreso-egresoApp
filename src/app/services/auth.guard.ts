import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  // canActivate(): Observable<boolean> | Observable <boolean> | UrlTree | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.authService.isAuth().pipe(
  //     tap((isAuth) => {
  //       if (!isAuth) this.router.navigate(['login']);
  //     })
  //   );
  // }

  canActivate():Observable <boolean> | UrlTree | Promise<boolean | UrlTree> | boolean | UrlTree{
    return this.authService.isAuth()
  }

  
}
