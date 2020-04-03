import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  currentUsername = this._authenticationService.currentUserValue.login;
  currentUser: Customer = null;

  constructor(private _userService: UserService,
              private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._userService.getCustomer(this.currentUsername).subscribe((data = new Customer) => {
      this._userService.getBillingAddress(this.currentUsername).subscribe((moreData = new Customer) => {
        this.currentUser = Object.assign(data, moreData);      
      });      
    });
  }

}
