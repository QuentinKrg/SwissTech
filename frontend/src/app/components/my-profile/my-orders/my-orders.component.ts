import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Order } from 'src/app/models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  currentUsername = this.authenticationService.currentUserValue.login;
  myOrders: Order[];
  Orderdetails: Order[];
  selectedOrder: string;

  public curantOrderID: number;
  public isCollapsed = -1;
  constructor(
    private _orderService: OrdersService,
    private authenticationService: AuthenticationService,
     private modalService: NgbModal
  ) { }

  ngOnInit() {

    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._orderService.getOrderByUsername(this.currentUsername)
    .subscribe((data: Order[]) => {
        this.myOrders = data;
      },
      (error) => {
        console.log(error);
      });
  }

  openModal(targetModal, order) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
    });

    this.selectedOrder = order.id_Order;
    
    this.getOrderDetails(this.selectedOrder);
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
