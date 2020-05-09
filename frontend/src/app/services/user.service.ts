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

  getAllUsers() {
    return this.http.get<User[]>(environment.backendURL + 'start.php?' + 'c=User&f=GetAllUsers');
  }

  updateUserRole(user: User) {
    return this.http.post<User[]>(environment.backendURL + 'start.php?' + 'c=User&f=UpdateUserRole',  user);
  }

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
  getAllShippingsAddress(user: string){
    return this.http.get<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=getAllShippingsAddressByUser&username=' + user);
  }
  getBillingAddress(user: string){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=getBillingAddressByUser&username=' + user);
  }

  getAllBillingsAddress(user: string){
    return this.http.get<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=getAllBillingsAddressByUser&username=' + user);
  }
  disableAddress(addressID){
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=disableAddress&addressID=' + addressID);
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
  updateUserStatus(customer: Customer) {
    
    return new Promise(
      (resolve, reject) => {
        return this.http.post<Customer>(environment.backendURL + 'start.php?' + 'c=User&f=UpdateUserStatus',customer).toPromise().then(
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
  addAddress(user, address: object){
    return this.http.post(environment.backendURL + 'start.php?' + 'c=Customer&f=AddAddress&username=' + user,address);
  }
}
