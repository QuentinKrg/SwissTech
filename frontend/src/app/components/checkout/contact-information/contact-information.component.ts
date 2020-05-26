import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact-information',
  templateUrl: './contact-information.component.html',
  styleUrls: ['./contact-information.component.css']
})
export class ContactInformationComponent implements OnInit {

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
    this.newAddressForm= this.fb.group({
      FullName: ['', Validators.required],
      CustomerTitle: ['', Validators.required],
      shippingID:[''],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    this._userService.getCustomer(this.currentUsername).subscribe((data = new Customer) => {
      this._userService.getShippingAddress(this.currentUsername).subscribe((moreData = new Customer) => {
        this.currentUser = Object.assign(data, moreData);      
      });      
    });
    this.getAllShippingsAddress();
    this.newShipAddress= false;
    this.submitted = false;
  }

  get f2() { return this.newAddressForm.controls; }

  onNewShipAddress(value){
    if(value==-1){
    this.newShipAddress = true;
    }else{
      this.newShipAddress = false;
    }
  }

  getAllShippingsAddress(){
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._userService.getAllShippingsAddress(this.currentUsername).subscribe(
      (data: Customer[]) => {
        this.myShipAddr= data;
        this.myShipAddr = this.myShipAddr;
        console.log(data);
        
      },
      (error) => {
        console.log(error);
      });
  }
  onSubmitAddress(address){
  console.log(address);

    if(address == -1){
      //Ajout une nouvelle adresse
      //Passe à la page payment
      console.log('test1');
      
      this.router.navigateByUrl('/checkout/payment')
    }else{

      //passe à la page payment
      console.log('test2');
      this.router.navigateByUrl('/checkout/payment')
    }
  }
}
