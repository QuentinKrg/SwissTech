import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {

  currentUsername = this._authenticationService.currentUserValue.login;
  currentUser: Customer = null;

  constructor(private _userService: UserService,
              private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    this._userService.getCustomer(this.currentUsername).subscribe(data => {
      this._userService.getShippingAddress(this.currentUsername).subscribe(moreData => {
        this.currentUser = Object.assign(data, moreData);      
      });      
    });
  }


}
