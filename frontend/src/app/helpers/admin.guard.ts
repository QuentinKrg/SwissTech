import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
    
  currentUser: User;
  currentUserRole: string;

    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        this._authenticationService.currentUser.subscribe(x => this.currentUser = x);
        if(this.currentUser != null) {
            this.currentUserRole = this.currentUser.role;
            if (this.currentUserRole == "AD") {
                // authorised so return true
                return true;
            }
            else{
                // N'est pas administrateur donc est redirigé vers la page
                this._router.navigate(['']);
                return false;
            }
        }else{
            // N'est pas administrateur donc est redirigé vers la page
            this._router.navigate(['']);
            return false;
        }
    }
}