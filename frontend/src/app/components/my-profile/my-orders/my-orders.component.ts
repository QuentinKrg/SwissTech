import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Order } from 'src/app/models/order';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { PrintService } from 'src/app/services/print.service';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  //icones
  faPrint = faPrint;
  //Récupération du nom d'user actuel
  currentUsername = this.authenticationService.currentUserValue.login;
  //Propriétés de vérification et affichage de données
  myOrders: Order[];
  Orderdetails: Order[];
  selectedOrder: Order = new Order;
  filterValue: Array<any> = [];
  dateToFilterWith: string = "";
  selectedOption: number = -1;
  imageUrl: string;
  shippingAddress: Order;
  billingAddress: Order;
  //Pagination
  pageSize: number;
  itemsPerPage: number;

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
    this.getAllOrders();
  }
  
  //Appel au service qui retourne toutes les commandes de l'user
  getAllOrders(){
    this._orderService.getOrderByUsername(this.currentUsername)
    .subscribe((data: Order[]) => {
      this.myOrders = data;
      this.filterValue = this.myOrders;//Filtrage
      console.log(this.myOrders);
    });
      
  }
  //Modal avec les détails de la commande
  openModal(targetModal, order) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.selectedOrder = order;
    this.getOrderDetails(this.selectedOrder.id_Order);
  }
  //Récupère les détails de la commande sélectionée
  getOrderDetails(orderid) {
    this._orderService.getOrderDetailsByOrderID(orderid)
      .subscribe((data: Order[]) => {
        this.Orderdetails = data;
      },
        (error) => {
          console.log(error);
        });
    //Récupère l'adresse de livraison
    this._orderService.getOrderShippingAddressByOrderID(orderid)
      .subscribe((data: Order) => {
        this.shippingAddress = data;
      },
        (error) => {
          console.log(error);
        });
    //Récupère l'adresse de facturation
    this._orderService.getOrderBillingAddressByOrderID(orderid)
      .subscribe((data: Order) => {
        this.billingAddress = data;
      },
        (error) => {
          console.log(error);
        });
  }
  //Filtrer les commandes par date sélectionée
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
  //fonction d'impression d'un commande via le service Print
  onPrintInvoice(order: Order) {
    localStorage.setItem('order', JSON.stringify(order));
    this._printService.printDocument(order.id_Order);
  }
  //Récupère la taille de la page
  pageSizeEvent($event) {
    this.pageSize = $event;
  }
  //Récupère le nombre d'item par page
  itemsPerPageEvent($event) {
    this.itemsPerPage = $event;
  }
}
