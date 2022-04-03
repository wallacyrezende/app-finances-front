import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    CanActivateChild,
    UrlTree,
} from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivateChild {
    constructor(
        public authService: AuthService,
        public router: Router
    ) { }

    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authService.isLoggedIn !== true) {
            this.router.navigate(['login']);
        }
        return true;
    }
}