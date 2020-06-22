import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  currentCustomer= new Customer;
  currentUsername = this._authenticationService.currentUserValue.login;

  constructor(
    private _userService: UserService,
    private _authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    //Appel au service qui retourne les infos personnelles du clients
    this._userService.getCustomer(this.currentUsername).subscribe(
      (data: Customer) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues à un objet de type customer
        this.currentCustomer = data;
      },
      (error) => {
        console.log(error);
      });
    //Service qui retourne l'adresse de livraison et assigne les données à un objet de type customer
    this._userService.getShippingAddress(this.currentUsername).subscribe(
      (data: Customer) => {
        this.currentCustomer.shippingAddress = data.shippingAddress;
        this.currentCustomer.shippingCity = data.shippingCity;
        this.currentCustomer.shippingZip = data.shippingZip;
      },
      (error) => {
        console.log(error);
      });
    //Service qui retourne l'adresse de facturation et assigne les données un objet de type customer
    this._userService.getBillingAddress(this.currentUsername).subscribe(
      (data: Customer) => {
        this.currentCustomer.billingAddress = data.billingAddress;
        this.currentCustomer.billingCity = data.billingCity;
        this.currentCustomer.billingZip = data.billingZip;
      },
      (error) => {
        console.log(error);
      });
    
  }

}

