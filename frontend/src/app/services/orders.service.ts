import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Subject } from 'rxjs';
import { PaymentOrder } from '../models/paymentorder';
import { CreditCard } from '../models/creditcard';
import { Status } from '../models/status';

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
  getOrderDetailsByOrderID(orderid: number){
    return this.http.get<Order[]>(environment.backendURL + 'start.php?' + 'c=Orders&f=getProductsFromOrderByOrderID&orderid=' + orderid);
  }
  getOrderShippingAddressByOrderID(orderid: number){
    return this.http.get<Order>(environment.backendURL + 'start.php?' + 'c=Orders&f=getOrderShippingAddressByOrderID&orderid=' + orderid);
  }
  getOrderBillingAddressByOrderID(orderid: number){
    return this.http.get<Order>(environment.backendURL + 'start.php?' + 'c=Orders&f=getOrderBillingAddressByOrderID&orderid=' + orderid);
  }
  emitOrderSubject(order){
    this.orderSubject.next(order.slice());
  }
  emitOrderDetailSubject(order){
    this.orderDetailSubject.next(order.slice());
  }
  
  addNewOrder(paymentInfo: PaymentOrder) {
    return this.http.post<PaymentOrder>(environment.backendURL + 'start.php?' + 'c=Orders&f=addOrder', paymentInfo);
  }

  addCreditCard(creditCard: CreditCard) {
    return this.http.post<CreditCard>(environment.backendURL + 'start.php?' + 'c=Orders&f=addCreditCard', creditCard);
  }

  getAllOrders() {
    return this.http.get<Order[]>(environment.backendURL + 'start.php?' + 'c=Orders&f=getAllOrders');
  }

  getAllStatus() {
    return this.http.get<Status[]>(environment.backendURL + 'start.php?' + 'c=Orders&f=getAllStatus');
  }

  updateOrder(order: Order) {
    return this.http.post<Order>(environment.backendURL + 'start.php?' + 'c=Orders&f=updateOrder', order);
  }
}
