import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(private _authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        // ajouter un header avec le token ssi disponible
        
        var currentUser = this._authenticationService.currentUserValue;
        if(currentUser && currentUser.token) {
            request = request.clone( {
                setHeaders: {
                    'Username': `${currentUser.username}`,
                    'Authorization': `${currentUser.token}`,
                    'Role': `${currentUser.role}`
                }
                
            });
        }
        return next.handle(request);
    }
}