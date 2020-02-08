import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

    constructor(private http: HttpClient) { 
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();  
   }

   public get currentUserValue(): User {
      //console.log(this.currentUserSubject.value)
      return this.currentUserSubject.value;
   }

   login(user: User) {

    user.password = CryptoJS.SHA256(user.password).toString();

    return this.http.post<User>(environment.backendURL + 'start.php?' + 'c=User&f=Login', user)
      .pipe(map(usr => {
        //console.log(usr);
        // La connection est réussie si il y a un token en retour
        if(usr && usr.token) {

          // Enregistrement des détails de l'utilisateur et du token en local pour garder la connection entre les refresh
          localStorage.setItem('currentUser', JSON.stringify(usr));
          this.currentUserSubject.next(usr);
        }
        return usr;
      }));
      
   }

   logout() {
     // Enlever l'utilisateur du stockage local pour se déconnecter
     localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
   }
}
