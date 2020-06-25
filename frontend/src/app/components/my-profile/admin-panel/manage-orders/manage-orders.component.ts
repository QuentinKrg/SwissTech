import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { Status } from 'src/app/models/status';
import { Order } from 'src/app/models/order';
import { AlertService } from 'src/app/services/alert.service';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  
  constructor(private _orderService: OrdersService,
              private _alertService: AlertService,
              private _datePipe: DatePipe,
              private _modalService: NgbModal) { 
                
              }

  //Pagination
  pageSize: number;
  itemsPerPage: number;
  //Variables
  allStatus: Status[];
  allOrders: Order[];
  filterValue: Array<any> = [];
  selectedOption: number = -1;
  textToFilterWith : string = "";
  dateToFilterWith: string = "";
  selectedOrder: Order = new Order;
  orderDetails: Order[] = [];

  ngOnInit() {
    window.scroll(0,0);
    //Appel un service qui retourne tous les status des commandes
    this._orderService.getAllStatus().subscribe(data => this.allStatus = data);
    //Récupère toutes les commandes depuis une fonction de ce component
    this.getAllOrders();
    
  }
  //Récupération des comandes 
  getAllOrders() {
    //Appel à un service qui retourne toutes les commandes dans la DB
    this._orderService.getAllOrders().subscribe((data: Order[]) => {
      this.allOrders = data;
      this.filterValue = this.allOrders;//Toutes les commandes à filtrer
    });
  }
//Fonction pour changer le statut d'une commande
  onOptionsSelected(statusValue: number, orderId: number){
    let tmpOrder = new Order;
    tmpOrder.id_Order = orderId;
    tmpOrder.StatusId = statusValue;
    //Met à jour la commande via un service
    this._orderService.updateOrder(tmpOrder).subscribe(
      () => {
        //Averti l'admin que la commande a été modifié
        this._alertService.success("Le status de la commande n°" + orderId + " a bien été modifié.");
        this.getAllOrders();
      },
      error => {this._alertService.error("Une erreur est survenue lors de la modification du status de la commande " + orderId +".")}
    );

    
  }
//Fonction de filtrage par text
  filteredByText(initial: string) {
    this.allOrders = this.filterValue;

    if(this.selectedOption != -1) {
      this.allOrders = this.allOrders.filter(i => i.StatusId == this.selectedOption);
    }

    this.allOrders = this.allOrders.filter(i => i.Username.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);

    if(this.dateToFilterWith != "" || this.dateToFilterWith == null)  {
      this.allOrders = this.allOrders.filter(i => this._datePipe.transform(i.OrderDate, "yyyy-MM-dd").toString() == this.dateToFilterWith);
    }
    this.textToFilterWith = initial.toLocaleLowerCase();
  }
//Fonction de filtrage par statut
  filteredByStatus() {
    this.allOrders = this.filterValue;
    if(this.selectedOption == -1) {
      this.allOrders = this.filterValue;
    } else {
      this.allOrders = this.allOrders.filter(i => i.StatusId === this.selectedOption);
    }

    if(this.dateToFilterWith != "" || this.dateToFilterWith == null) {
      this.allOrders = this.allOrders.filter(i => this._datePipe.transform(i.OrderDate, "yyyy-MM-dd").toString() == this.dateToFilterWith);
    }
    this.allOrders = this.allOrders.filter(i => i.Username.toLowerCase().indexOf(this.textToFilterWith) !== -1);
  }
//Fonction de filtrage par date
  filteredByDate(value: string) {
    this.allOrders = this.filterValue;

    if(value == null || value == "") {
      this.allOrders = this.filterValue;
      this.dateToFilterWith = "";
    } else {
      this.allOrders = this.allOrders.filter(i => this._datePipe.transform(i.OrderDate, "yyyy-MM-dd").toString() == value);
      
      this.dateToFilterWith = value;
    }

    if(this.selectedOption != -1) {
      this.allOrders = this.allOrders.filter(i => i.StatusId == this.selectedOption);
    }

    this.allOrders = this.allOrders.filter(i => i.Username.toLowerCase().indexOf(this.textToFilterWith) !== -1);
    
  }
//Fonction pour lancer un modal 
  openModal(targetModal, order) {
    //Ouvre un modal
    this._modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.selectedOrder = order;
    //Récupère les détails de la commande selectionné
    this._orderService.getOrderDetailsByOrderID(this.selectedOrder.id_Order).subscribe(data => { this.orderDetails = data});
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
