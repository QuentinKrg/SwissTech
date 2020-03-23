import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

 constructor(private http: HttpClient) { }

  getOrderByUsername(user: string){
    return this.http.get<Order[]>(environment.backendURL + 'start.php?' + 'c=Orders&f=GetOrderByUsername&username=' + user);
  }
  getOrderDetailsByUsername(user: string){
    return this.http.get<Order[]>(environment.backendURL + 'start.php?' + 'c=Orders&f=getProductsFromOrderByUser&username=' + user);
  }
  
}
