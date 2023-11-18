import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
              next: HttpHandler) : Observable<HttpEvent<any>> {

        const user = JSON.parse( localStorage.getItem('currentUser') || '{}' );

        if (user.accessToken) 
        {
            const cloned = req.clone({
                //headers : req.headers.set("Authorization", "Bearer " + user.accessToken)
                headers : req.headers.set("x-access-token", user.accessToken)
            });

            return next.handle(cloned);
        }
        else 
        {
            return next.handle(req);
        }
    }
}