import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';
import { CustomValidators } from 'src/app/helpers/CustomValidators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  myShipAddr: Customer[];
  myBillAddr: Customer[];
  selectedAddress: Customer = new Customer;
  editShippingAddrForm: FormGroup;
  editBillingAddrForm: FormGroup;
  loading;
  submitted;
  returnUrl: string;
  ariaOneisExpended;
  user = new User;
  haveUser: String;
  usernameErrorMessage: String;
  userUpdateDataMessage: String;
  userUpdateData = false;
  isUserValid = true;
  usernameData;
  passwordErrorMessage: String;
  FormErrorMessage: String;
  FormError= false;
  isPasswordCorrect =false;
  changeUsername = false;
  changePassword= false;
  currentUsername = this.authenticationService.currentUserValue.login;
  constructor(    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
    this.loading=false;
    this.submitted = false;
    
    this.editShippingAddrForm = this.formBuilder.group({
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    this.editBillingAddrForm = this.formBuilder.group({
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._userService.getAllShippingsAddress(this.currentUsername).subscribe(
      (data: Customer[]) => {
        this.myShipAddr= data;
        this.myShipAddr = this.myShipAddr;
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
    //Service qui retourne l'adresse de facturation et assigne les données au formulaire
    this._userService.getAllBillingsAddress(this.currentUsername).subscribe(
      (data : Customer[]) => {
        this.myBillAddr = data;
        this.myBillAddr = this.myBillAddr;
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });

    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.editShippingAddrForm.controls; }
  get f2() { return this.editBillingAddrForm.controls; }


openModal(targetModal, addr) {
  this.modalService.open(targetModal, {
   centered: true,
   backdrop: 'static',
   size: 'md'
  });
  
        this.f.shippingAddress.setValue(addr.shippingAddress);
        this.f.shippingCity.setValue(addr.shippingCity);
        this.f.shippingZip.setValue(addr.shippingZip);
        this.f2.billingAddress.setValue(addr.billingAddress);
        this.f2.billingCity.setValue(addr.billingCity);
        this.f2.billingZip.setValue(addr.billingZip);
        
 }
 onSubmitShippingAddresse() {
  
  //Stop si le formulaire n'est pas valide
  if (this.editShippingAddrForm.invalid) {
    this.submitted = false;
  }
  // Stop si le formulaire n'est pas correctement rempli
  if (this.editShippingAddrForm.invalid) {
    this.userUpdateData = false;
    this.FormError = true;
    this.FormErrorMessage="Veuillez remplir correctement tous les champs marqués d'un *";
    return;
  }else{
    this.FormError = false;
    this.FormErrorMessage = "";
  }
  
  //désactive le bouton d'enregistrement
  this.loading = true;

  //vérifie que le nom d'utilisateur est disponible
  
      //update de l'utilisateur
      this._userService.updateCustomer(this.currentUsername,this.editShippingAddrForm.value).then(
        () => {
          console.log('tout va bien');
          if(this.editShippingAddrForm.value.Username != null){
            this.currentUsername = this.editShippingAddrForm.value.Username;
            let localStorageData = JSON.parse(localStorage.getItem('currentUser'));
            localStorageData.login = this.currentUsername;
            localStorage.setItem('currentUser', JSON.stringify(localStorageData));
            console.log(localStorageData);              
            this.authenticationService.currentUserValue.login = this.currentUsername;
          }
          
          this.ngOnInit();
          this.userUpdateData = true;
          this.userUpdateDataMessage = 'Les modifications ont été sauvegardées';
        },  
        //en cas d'erreur
        (error) => {
          console.log(error);
          this.submitted = false;
          this.loading = false;
          return;
        });
        this.changeUsername = false;
        this.changePassword = false;

        this.modalService.dismissAll();
}
onSubmitBillingAddresse() {
  
  //Stop si le formulaire n'est pas valide
  if (this.editBillingAddrForm.invalid) {
    this.submitted = false;
  }
  // Stop si le formulaire n'est pas correctement rempli
  if (this.editBillingAddrForm.invalid) {
    this.userUpdateData = false;
    this.FormError = true;
    this.FormErrorMessage="Veuillez remplir correctement tous les champs marqués d'un *";
    return;
  }else{
    this.FormError = false;
    this.FormErrorMessage = "";
  }
  
  //désactive le bouton d'enregistrement
  this.loading = true;

  //vérifie que le nom d'utilisateur est disponible
  
      //update de l'utilisateur
      this._userService.updateCustomer(this.currentUsername,this.editBillingAddrForm.value).then(
        () => {
          console.log('tout va bien');
          if(this.editBillingAddrForm.value.Username != null){
            this.currentUsername = this.editBillingAddrForm.value.Username;
            let localStorageData = JSON.parse(localStorage.getItem('currentUser'));
            localStorageData.login = this.currentUsername;
            localStorage.setItem('currentUser', JSON.stringify(localStorageData));
            console.log(localStorageData);              
            this.authenticationService.currentUserValue.login = this.currentUsername;
          }
          this.ngOnInit();
          this.userUpdateData = true;
          this.userUpdateDataMessage = 'Les modifications ont été sauvegardées';
        },  
        //en cas d'erreur
        (error) => {
          console.log(error);
          this.submitted = false;
          this.loading = false;
          return;
        });
        this.changeUsername = false;
        this.changePassword = false;

        this.modalService.dismissAll();
}
}
