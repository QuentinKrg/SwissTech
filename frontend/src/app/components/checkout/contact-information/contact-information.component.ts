import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {

  public selectedShippingID : number;

  currentUsername = this._authenticationService.currentUserValue.login;
  currentUser: Customer = null;
  myShipAddr: Customer[];
  newShipAddress: boolean;
  newAddressForm: FormGroup;
  submitted: boolean;
  constructor(private _userService: UserService,
    private _authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    localStorage.removeItem('shippingID');
    this.newAddressForm = this.fb.group({
      FullName: ['', Validators.required],
      addressType: ['1'],
      CustomerTitle: ['', Validators.required],
      shippingID: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    this._userService.getCustomer(this.currentUsername).subscribe((data = new Customer) => {
      this._userService.getShippingAddress(this.currentUsername).subscribe((moreData = new Customer) => {
        this.currentUser = Object.assign(data, moreData);
      });
    });
    this.getAllShippingsAddress();
    this.newShipAddress = false;
    this.submitted = false;
  }

  get f2() { return this.newAddressForm.controls; }

  onNewShipAddress(value) {
    if (value == -1) {
      this.newShipAddress = true;
    } else {
      this.newShipAddress = false;
    }
  }

  getAllShippingsAddress() {
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._userService.getAllShippingsAddress(this.currentUsername).subscribe(
      (data: Customer[]) => {
        this.myShipAddr = data;
        this.myShipAddr = this.myShipAddr;
        console.log(data);

      },
      (error) => {
        console.log(error);
      });
  }
  onSubmitAddress(address) {
    console.log(address);
    const addressObj = JSON.parse(address);
    this.submitted = true;
    
    if (address == -1) {
      if(this.newAddressForm.invalid){
        return;
      }
      //Ajoute une nouvelle adresse
      this._userService.addAddress(this.currentUsername, this.newAddressForm.value).subscribe(
        () => {
          this._userService.getLastShippingAddress(this.currentUsername).subscribe((moreData = new Customer) => {
            this.selectedShippingID = moreData.id_Address;
            localStorage.setItem('shippingID', this.selectedShippingID.toString());
          });
        // this.selectedShippingID = get last id
          this.router.navigateByUrl('/checkout/payment')
        }, (error) => {
          console.log(error);

        });
      //Passe à la page payment
      console.log('test1');

    } else {
      this.selectedShippingID = addressObj.shippingID;
      localStorage.setItem('shippingID', this.selectedShippingID.toString());
      //passe à la page payment
      this.router.navigateByUrl('/checkout/payment')
    }
  }
}
