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
        this.currentUserRole = this.currentUser.role;

        console.log(this.currentUserRole);

        if (this.currentUserRole == "AD") {
            // authorised so return true
            return true;
        }else{
        // not logged in so redirect to login page with the return url
        this._router.navigate(['/myprofile']);
        return false;
        }
    }
}