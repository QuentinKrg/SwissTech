import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { resolve } from 'url';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

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
  updateCustomer(user: String, customer: Customer) {
    if(customer.password!=null){
      customer.password = CryptoJS.SHA256(customer.password).toString();//Hash le mot de passe reçu avant l'envoyer au backend
    }
    return new Promise(
      (resolve, reject) => {
        return this.http.post<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=UpdateCustomer&username='+user, customer).toPromise().then(
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
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=GetCustomerByUsername&username=' + user);
  }
  getCustomerById(id: number){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=GetCustomerById&id=' +id);
  }
  getAllCustomers(){
    return this.http.get<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=GetAllCustomers') ;
  }
  getShippingAddress(user: string){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=getShippingAddressByUser&username=' + user);
  }
  getBillingAddress(user: string){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=getBillingAddressByUser&username=' + user);
  }
  checkUserByUsername(user: User) {
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
  checkPassword(user: User) {
    user.password = CryptoJS.SHA256(user.password).toString();//Hash le mot de passe reçu avant l'envoyer au backend
    return new Promise(
      (resolve, reject) => {
        this.http.post<User[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=CheckPassword', user).toPromise().then(
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
