import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Order } from 'src/app/models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { PrintService } from 'src/app/services/print.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  currentUsername = this.authenticationService.currentUserValue.login;
  myOrders: Order[];
  Orderdetails: Order[];
  selectedOrder: Order = new Order;
  filterValue: Array<any> = [];
  dateToFilterWith: string = "";
  selectedOption: number = -1;
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  collectionSize: number;
  imageUrl: string;
  shippingAddress: Order;
  billingAddress: Order;

  public curantOrderID: number;
  public isCollapsed = -1;

  constructor(
    private _orderService: OrdersService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private _datePipe: DatePipe,
    private _printService: PrintService
  ) {
    this.imageUrl = environment.imageDirectory;
  }


  ngOnInit() {

    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._orderService.getOrderByUsername(this.currentUsername)
      .subscribe((data: Order[]) => {
        this.myOrders = data;
        this.myOrders = this.myOrders;
        this.collectionSize = this.myOrders.length;

        this.filterValue = this.myOrders;
      },
        (error) => {
          console.log(error);
        });
  }
  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }

  changePagesize(num) {
    this.itemsPerPage = num;
  }
  openModal(targetModal, order) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });

    this.selectedOrder = order;

    this.getOrderDetails(this.selectedOrder.id_Order);
  }

  getOrderDetails(orderid) {
    this._orderService.getOrderDetailsByOrderID(orderid)
      .subscribe((data: Order[]) => {
        this.Orderdetails = data;
      },
        (error) => {
          console.log(error);
        });

    this._orderService.getOrderShippingAddressByOrderID(orderid)
      .subscribe((data: Order) => {
        this.shippingAddress = data;
      },
        (error) => {
          console.log(error);
        });

    this._orderService.getOrderBillingAddressByOrderID(orderid)
      .subscribe((data: Order) => {
        this.billingAddress = data;
      },
        (error) => {
          console.log(error);
        });
  }
  filteredByDate(value: string) {
    this.myOrders = this.filterValue;

    if (value == null || value == "") {
      this.myOrders = this.filterValue;
      this.dateToFilterWith = "";
    } else {
      this.myOrders = this.myOrders.filter(i => this._datePipe.transform(i.OrderDate, "yyyy-MM-dd").toString() == value);

      this.dateToFilterWith = value;
    }

    if (this.selectedOption != -1) {
      this.myOrders = this.myOrders.filter(i => i.StatusId == this.selectedOption);
    }
    
  }

  onPrintInvoice(order:Order) {
    localStorage.setItem('order', JSON.stringify(order));
    this._printService.printDocument(order.id_Order);
  }

}
