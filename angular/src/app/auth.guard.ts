import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from './services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{

    constructor(
        private auth  : AuthenticationService,
        private router: Router
    )
    {}


    canActivate(
        next : ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) : Observable<boolean> | Promise<boolean> | boolean {

        if( !this.auth.isLoggedIn )
        {
            this.router.navigate(['/auth/login']);
            return false;
        }
        else
        {
            return true;
        }
    }


}
