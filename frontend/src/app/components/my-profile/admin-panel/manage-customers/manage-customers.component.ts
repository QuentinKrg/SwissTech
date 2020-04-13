import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {

allCustomers: Customer[];
@Input() CustomerTitre: string;
@Input() CustomerName: string;
@Input() indexOfCustomer: number;
@Input() id_customer: number;
@Input() id_user: number;
@Input() CustomerLastName: string;
@Input() isActive: number;


  filterValue: Array<any> = [];
  constructor(
    private _userService: UserService,) { 
    
    }

    filterByText(initial: string) {
    this.allCustomers = this.filterValue;
      this.allCustomers = this.allCustomers.filter(i => i.Username.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    }

  ngOnInit() {
    //Appel au service qui retourne les infos personnelles du clients
    this.getCustomers();
  }
  getCustomers(){
    this._userService.getAllCustomers().subscribe(
      (data : Customer[]) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues au formulaire
        this.allCustomers = data;
        this.filterValue = this.allCustomers;
        console.log(this.filterValue);
      },
      (error) => {
        console.log(error);
      });
  }

}