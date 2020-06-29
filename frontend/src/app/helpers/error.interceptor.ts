import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Si erreur = 401 -> logout
                this.authenticationService.logout();
                location.reload(true);
            }

            if( error.status === 404) {
                // Si erreur = 404 -> redirection page 404
                
            }

            const err = error.message || error.status;
            return throwError(err);
        }))
    }
}