import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  addCustomer(customer: Customer) {
    return this.http.post<Customer[]>(environment.backendURL + 'start.php?' + 'c=Customer&f=AddCustomer',  customer);
  }
}
