import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  addCustomer(customer: Customer) {
    return new Promise(
      (resolve, reject) => {
        return this.http.post<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=AddCustomer', customer).toPromise().then(
          () => {
            resolve();
          },
          (error) => {
            reject(error)
          }
          );
        }
      );
    }

    getCustomer(user: string){
      return this.http.get<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=GetCustomerByUsername?username='+ user);
    }

  getUserByUsername(user: User) {
    return new Promise(
      (resolve, reject) => {
        this.http.post<User[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=CheckUserByUsername', user).toPromise().then(
          () => {
            resolve();
          },
          (error) => {
            reject(error)
          }
        );
      }
    );
  }

}
