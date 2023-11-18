import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { NotifyService } from '../services/notify.service';
//import { AuthenticationService } from 'app/main/_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor
{


    /**
     * Constructor
     *
     * @ param {AuthenticationService} _authenticationService
     * @param {NotifyService} _notifyService
     * @param {Router} _router
     */
    constructor(
        // private _authenticationService: AuthenticationService,
        private _notifyService : NotifyService,
        private _router        : Router
    )
    {
    }


    intercept( request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle( request ).pipe( catchError( err => {

            switch ( err.status )
            {
                case 401 :
                    // auto logout if 401 response returned from api
                    //this._authenticationService.logout();
                    this._router.navigate(['/auth/login']);
                    break;

                case 403 :
                    this._notifyService.error( "Please Authenticate" );
                    this._router.navigate(['/auth/login']);
                    break;

                case 404 :
                    this._notifyService.error( 'Página não Encontrada' );
                    this._router.navigate(['/error']);
                    break;

                case 426 :
                    this._router.navigate(['/auth/login']);
                    break;
            }

            const error = err.error.message || err.statusText;
            return throwError(error);

        }))
    }


}