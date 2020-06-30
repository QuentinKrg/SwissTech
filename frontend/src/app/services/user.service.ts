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

  constructor(private http: HttpClient) {setInterval(()=> { this.CleanupLocks().subscribe(); }, 60000); }

  getAllUsers() {
    return this.http.get<User[]>(environment.backendURL + 'start.php?' + 'c=User&f=GetAllUsersMBAD');
  }

  updateUserRole(user: User) {
    return this.http.post<User[]>(environment.backendURL + 'start.php?' + 'c=User&f=UpdateUserRoleMBAD',  user);
  }

  addCustomer(customer: Customer) {
        return this.http.post<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=AddCustomer', customer);
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
    return this.http.get<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=GetAllCustomersMBL') ;
  }
  getShippingAddress(user: string){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=getShippingAddressByUserMBL&username=' + user);
  }
  getLastShippingAddress(user: string){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=getLastShippingAddressByUserMBL&username=' + user);
  }
  getAllShippingsAddress(user: string){
    return this.http.get<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=getAllShippingsAddressByUserMBL&username=' + user);
  }
  getBillingAddress(user: string){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=getBillingAddressByUserMBL&username=' + user);
  }
  getLastBillingAddress(user: string){
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=getLastBillingAddressByUserMBL&username=' + user);
    
  }

  getAllBillingsAddress(user: string){
    return this.http.get<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=getAllBillingsAddressByUserMBL&username=' + user);
  }
  disableAddress(addressID){
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=disableAddressMBL&addressID=' + addressID);
  }
  setAddressByDefault(addressID,type,user){
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=SetAddressByDefaultMBL&addressID=' + addressID+'&addressType='+type
    +'&username='+user);
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
    return this.http.post(environment.backendURL + 'start.php?' + 'c=Customer&f=AddAddressMBL&username=' + user,address);
  }
  CheckLock(id:number) {
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Customer&f=LockCheckMBAD&id=' +id);
  }
  UpdateLock(id:number) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=UpdateLockMBAD&id=' +id);
  }
  AddLock(id:number, username: string) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=AddLockMBAD&id=' +id+'&username='+username);
  }
  ReleaseLock(id:number, username: string) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=ReleaseLockMBAD&id=' +id+'&username='+username);
  }
  ForceReleaseLock(id:number) {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=ForceReleaseLockMBAD&id=' +id);
  }
  CleanupLocks() {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Customer&f=CleanupLocks');
  }
}
