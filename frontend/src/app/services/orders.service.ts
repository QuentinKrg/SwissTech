import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
orderSubject = new Subject<any[]>();
orderDetailSubject = new Subject<any[]>();
 constructor(private http: HttpClient) { }

  getOrderByUsername(user: string){
    return this.http.get<Order[]>(environment.backendURL + 'start.php?' + 'c=Orders&f=GetOrderByUsername&username=' + user);
  }
  getOrderDetailsByUsername(user: string){
    return this.http.get<Order[]>(environment.backendURL + 'start.php?' + 'c=Orders&f=getProductsFromOrderByUser&username=' + user);
  }
  emitOrderSubject(order){
    this.orderSubject.next(order.slice());
  }
  emitOrderDetailSubject(order){
    this.orderDetailSubject.next(order.slice());
  }
}
