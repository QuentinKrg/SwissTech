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
  
  Orderdetails: Order[];
  
  @Input() OrderStatus: string;
  @Input() OrderDate: string;
  @Input() indexOfOrder: number;
  @Input() OrderID: number;
  @Input() TotalOrder: number;
  
  
  currentUsername = this.authenticationService.currentUserValue.login;
  
  constructor( private _orderService: OrdersService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
        
  }
  getOrderDetails(orderid){
    this._orderService.getOrderDetailsByOrderID(orderid)
    .subscribe((data: Order[]) => {
      this.Orderdetails = data;
      //this._orderService.emitOrderDetailSubject(this.Orderdetails);
        console.log(this.Orderdetails);
      },
      (error) => {
        console.log(error);
      });

  }
}
