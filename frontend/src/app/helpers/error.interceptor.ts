import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // Si erreur = 401 -> logout
                this.authenticationService.logout();
                location.reload(true);
            }

            if( err.status === 404) {
                // Si erreur = 404 -> redirection page 404
                console.log("404");
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}