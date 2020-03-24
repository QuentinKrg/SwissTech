import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Order } from 'src/app/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  currentUsername = this.authenticationService.currentUserValue.login;
  myOrders: Order[];
  ordersDetails: Order[];

  constructor(
    private _orderService: OrdersService,
    private authenticationService: AuthenticationService
  ) { }
  
  ngOnInit() {

    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._orderService.getOrderByUsername(this.currentUsername)
    .subscribe((data: Order[]) => {
        this.myOrders = data;
        this._orderService.emitOrderSubject(this.myOrders);
        console.log(this.myOrders);
      },
      (error) => {
        console.log(error);
      });

    //Service qui retourne l'adresse de facturation et assigne les données au formulaire
    this._orderService.getOrderDetailsByUsername(this.currentUsername)
    .subscribe((data: Order[]) => {
      this.ordersDetails = data;
        console.log(this.ordersDetails);
        
      },
      (error) => {
        console.log(error);
      });
  }

}
