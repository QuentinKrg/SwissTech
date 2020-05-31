import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import { environment } from 'src/environments/environment';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  orderId: number;
  orderDetails: Order[];
  imageUrl: string;
  orderInfos: Order;
  billingAddress: Order;
  shippingAddress: Order;
  
  constructor(
    private _orderService: OrdersService,
    private _route: ActivatedRoute,
    private _printService: PrintService
  ) { 
    this.orderId = this._route.snapshot.params['id'];
    this.imageUrl = environment.imageDirectory;
  }

  ngOnInit() {
    this.orderInfos = JSON.parse(localStorage.getItem('order'));
    
    this.getInvoiceDetails(this.orderId).then(() => {this._printService.onDataReady()});
  }

  getInvoiceDetails(id: number) {
    // Récupération de l'adresse de facturation de la commande
    this._orderService.getOrderBillingAddressByOrderID(id).subscribe(data => {
      this.billingAddress = data;
    });

    // Récupération de l'adresse de livraison de la commande
    this._orderService.getOrderShippingAddressByOrderID(id).subscribe(data => {
      this.shippingAddress = data;
    });
    
    // Récupération des informations de la commande
    this._orderService.getOrderDetailsByOrderID(id).subscribe(data => {
      this.orderDetails = data;
    });
    
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.orderInfos), 1000)
    });
  }

}
