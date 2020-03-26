import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  
  @Input() OrderStatus: string;
  @Input() OrderDate: string;
  @Input() indexOfOrder: number;
  @Input() OrderID: number;
  
  
  currentUsername = this.authenticationService.currentUserValue.login;
  Orderdetails: Order[];
  constructor( private _orderService: OrdersService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    //Service qui retourne l'adresse de facturation et assigne les données au formulaire
    this._orderService.getOrderDetailsByUsername(this.currentUsername)
    .subscribe((data: Order[]) => {
      this.Orderdetails = data;
      this._orderService.emitOrderSubject(this.Orderdetails);
        console.log(this.Orderdetails);
      },
      (error) => {
        console.log(error);
      });
  }

}
