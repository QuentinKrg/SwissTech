import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  orderId: number;
  orderDetails: Order[];
  imageUrl: string;
  
  constructor(
    private _orderService: OrdersService,
    private _route: ActivatedRoute
  ) { 
    this.orderId = this._route.snapshot.params['id'];
    this.imageUrl = environment.imageDirectory;
  }

  ngOnInit() {
    this._orderService.getOrderDetailsByOrderID(this.orderId).subscribe(data => this.orderDetails = data);
  }

}
