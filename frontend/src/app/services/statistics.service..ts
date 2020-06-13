import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Comments } from '../models/comments';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) {

  }

  GetNumberOfCustomers() {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Statistics&f=GetNumberOfCustomers');
  }
  GetLastCustomerRegistered() {
    return this.http.get<Customer>(environment.backendURL + 'start.php?' + 'c=Statistics&f=GetLastCustomerRegistered');
  }
  GetNumberOfComments() {
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Statistics&f=GetNumberOfComments');
  }
  GetLastCommentAdded() {
    return this.http.get<Comments>(environment.backendURL + 'start.php?' + 'c=Statistics&f=GetLastCommentAdded');
  }
  GetBestSellerProduct(){
    return this.http.get(environment.backendURL + 'start.php?' + 'c=Statistics&f=GetBestSellerProduct');
  }
}