import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        // ajouter un header avec le token ssi disponible
        
        var currentUser = this.authenticationService.currentUserValue;
        console.log(currentUser);
        if(currentUser && currentUser.token) {
            request = request.clone( {
                setHeaders: {
                    'Username': `${currentUser.login}`,
                    'Authorization': `${currentUser.token}`,
                    'Role': `${currentUser.role}`
                }
                
            });
        }
        console.log(request);
        return next.handle(request);
    }
}