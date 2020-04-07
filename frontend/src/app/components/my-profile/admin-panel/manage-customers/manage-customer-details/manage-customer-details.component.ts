import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-manage-customer-details',
  templateUrl: './manage-customer-details.component.html',
  styleUrls: ['./manage-customer-details.component.css']
})
export class ManageCustomerDetailsComponent implements OnInit {
  customer: Customer;
  customerId: number;
  changeCustomerData= false;

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService) {
      this.customer = new Customer();
     }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.customerId = params['id'];
    });

    // Récupération des détails de l'article 
    this._userService.getCustomerById(this.customerId)
    .subscribe(data => {
      this.customer = data as Customer;
      console.log(this.customer);
    });
  }
  onCustomerDataChange() {
    if (!this.changeCustomerData) {
      this.changeCustomerData = true;
    } else {
      this.changeCustomerData = false;
    }
    return this.changeCustomerData;
    
  }
  onUnableUser(){
    console.log(this.customer);
    if(this.customer.isActive){
      this.customer.isActive = false;
    }else{
    this.customer.isActive = true;
    }
    this._userService.updateUserStatus(this.customer)
    .then(
      () => {
      },  
      //en cas d'erreur
      (error) => {
        console.log(error);
        return;
      });
  }
}
