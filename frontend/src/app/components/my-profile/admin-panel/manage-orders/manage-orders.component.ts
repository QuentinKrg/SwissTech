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
              private _modalService: NgbModal) { }

  allStatus: Status[];
  allOrders: Order[];
  filterValue: Array<any> = [];
  selectedOption: number = -1;
  textToFilterWith : string = "";
  dateToFilterWith: string = "";
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  collectionSize: number;
  selectedOrder: Order = new Order;
  orderDetails: Order[] = [];

  ngOnInit() {
    this._orderService.getAllStatus().subscribe(data => this.allStatus = data);
    this.getAllOrders();
    
  }
  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  changePagesize(num) {
    this.itemsPerPage =  num;
  }
  
  getAllOrders() {
    this._orderService.getAllOrders().subscribe((data: Order[]) => {
      this.allOrders = data;
      this.filterValue = this.allOrders;
      this.collectionSize = this.allOrders.length;
    });
  }

  onOptionsSelected(statusValue: number, orderId: number){
    let tmpOrder = new Order;
    tmpOrder.id_Order = orderId;
    tmpOrder.StatusId = statusValue;

    this._orderService.updateOrder(tmpOrder).subscribe(
      () => {
        this._alertService.success("Le status de la commande n°" + orderId + " a bien été modifié.");
        this.getAllOrders();
      },
      error => {this._alertService.error("Une erreur est survenue lors de la modification du status de la commande " + orderId +".")}
    );

    
  }

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

  openModal(targetModal, order) {
    this._modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.selectedOrder = order;
    this._orderService.getOrderDetailsByOrderID(this.selectedOrder.id_Order).subscribe(data => { this.orderDetails = data});
  }


}
