import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'src/app/helpers/CustomValidators';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})

export class ManageCustomersComponent implements OnInit {
  //icones
  faEllipsisV=faEllipsisV;
  
  selectedAddress:Customer;
  myShipAddr: Customer[];
  myBillAddr: Customer[];
  allCustomers: Customer[];
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  collectionSize: number;
  editShipAddress:boolean;
  editBillAddress:boolean;
  usernameErrorMessage: String;
  userUpdateDataMessage: String;
  userUpdateData = false;
  selectedUser: string;
  editProfileForm: FormGroup;
  editAddressForm: FormGroup;
  element = <HTMLInputElement> document.getElementById("checkbox_status");
  isChecked:boolean;
  filterValue: Array<any> = [];
  filterText: string = "";
  selectedStatus: number = -1
  constructor(
    private _userService: UserService,private fb: FormBuilder, private modalService: NgbModal  ) {

  }

  ngOnInit() {
    this.editShipAddress =false;
    this.editBillAddress =false;

    this.editAddressForm= this.fb.group({
      shippingID:[''],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      billingID:[''],
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
    });
    this.editProfileForm = this.fb.group({
      CustomerTitre: ['', Validators.required],
      CustomerName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerLastName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerBirthday: ['', Validators.required],
      CustomerSince: [''],
      IpAddress: [''],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]],
      CustomerEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      Username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      myPassword: ['', [Validators.required]],
      password: [
        '',
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          // check whether the entered password has a lower case letter
          CustomValidators.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          // check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8)
        ])
      ]
    
     });
    this.getCustomers();
     this.editAddressForm.get('shippingID').disable();
     this.editAddressForm.get('billingID').disable();
      this.editAddressForm.get('shippingAddress').disable();
      this.editAddressForm.get('shippingCity').disable();
      this.editAddressForm.get('shippingZip').disable();
      this.editAddressForm.get('billingAddress').disable();
      this.editAddressForm.get('billingCity').disable();
      this.editAddressForm.get('billingZip').disable();
  }

  // Filtrer les articles par status 
  filteredByStatus() {
    this.allCustomers = this.filterValue;

    if(this.selectedStatus == -1) {
      this.allCustomers = this.filterValue;
    } else if (this.selectedStatus == 0) {
      this.allCustomers = this.allCustomers.filter(p => p.isActive == 0);
    } else if (this.selectedStatus == 1) {
      this.allCustomers = this.allCustomers.filter(p => p.isActive == 1);
    }

    // Filter avec le texte
    this.allCustomers = this.allCustomers.filter(i => i.Username.toLowerCase().indexOf(this.filterText) !== -1);
    
  }

  // Filtrer les articles avec le texte 
  filteredByText(initial: string) {
    this.allCustomers = this.filterValue;
    this.allCustomers = this.allCustomers.filter(i => i.Username.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    this.filterText = initial.toLocaleLowerCase();
    this.filteredByStatus();
  }

  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  changePagesize(num) {
  this.itemsPerPage =  num;
  
}
  
  get f() { return this.editProfileForm.controls; }

  getCustomers() {
    //appel àla fonction qui retourne tous les clients de UserService
    this._userService.getAllCustomers().subscribe(
      (data: Customer[]) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues au formulaire
        this.allCustomers = data;
        this.filterValue = this.allCustomers;
        this.collectionSize = this.allCustomers.length;
        console.log(this.filterValue);
      },
      (error) => {
        console.log(error);
      });
  }
  closeModal(){
    this.modalService.dismissAll();
    this.ngOnInit();
  }
  getAllShippingsAddress(){
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._userService.getAllShippingsAddress(this.selectedUser).subscribe(
      (data: Customer[]) => {
        this.myShipAddr= data;
        this.myShipAddr = this.myShipAddr;
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
  }
  getAllBillingsAddress(){
    //Service qui retourne l'adresse de facturation et assigne les données au formulaire
    this._userService.getAllBillingsAddress(this.selectedUser).subscribe(
      (data : Customer[]) => {
        this.myBillAddr = data;
        this.myBillAddr = this.myBillAddr;
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
  }
  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });

    this.selectedUser = user.Username;
    this.getAllShippingsAddress();
    this.getAllBillingsAddress();
    
    this.editProfileForm.patchValue({
      CustomerTitre: user.CustomerTitre ,
      CustomerName: user.CustomerName,
      CustomerLastName: user.CustomerLastName,
      CustomerBirthday: user.CustomerBirthday,
      CustomerEmail:  user.CustomerEmail,
      CustomerPhone: user.CustomerPhone,
      Username: user.Username,
      CustomerSince: user.CustomerSince,
      IpAddress: user.IpAddress
    });
   }
   onShipAddressChange(address){
    this.editShipAddress=true;
    this.editAddressForm.get('shippingID').enable();
    this.editAddressForm.get('shippingAddress').enable();
    this.editAddressForm.get('shippingCity').enable();
    this.editAddressForm.get('shippingZip').enable();

    this.selectedAddress = JSON.parse(address);
    console.log(this.selectedAddress);
    this.editAddressForm.patchValue({
      shippingID: this.selectedAddress.shippingID,
      shippingAddress: this.selectedAddress.shippingAddress,
      shippingCity: this.selectedAddress.shippingCity,
      shippingZip: this.selectedAddress.shippingZip
    });
   }
   onBillAddressChange(address){
    this.editBillAddress=true;
    this.editAddressForm.get('billingID').enable();
    this.editAddressForm.get('billingAddress').enable();
    this.editAddressForm.get('billingCity').enable();
    this.editAddressForm.get('billingZip').enable();

    this.selectedAddress = JSON.parse(address);
    console.log(this.selectedAddress);

    this.editAddressForm.patchValue({
      billingID: this.selectedAddress.billingID,
      billingAddress: this.selectedAddress.billingAddress,
      billingCity: this.selectedAddress.billingCity,
      billingZip: this.selectedAddress.billingZip
    });
   }
   onSubmit() {
     console.log(this.selectedUser);
     
    this.modalService.dismissAll();
    console.log(this.editProfileForm.value);
        
    console.log("res:", this.editProfileForm.getRawValue());

    //update de l'utilisateur
    this._userService.updateCustomer(this.selectedUser,this.editProfileForm.value).then(
      () => {
        console.log('tout va bien');
        if(this.editProfileForm.value.Username != null){
          this.selectedUser = this.editProfileForm.value.Username;
        }
        
        this.ngOnInit();
        this.userUpdateData = true;
        this.userUpdateDataMessage = 'Les modifications ont été sauvegardées';
      },  
      //en cas d'erreur
      (error) => {
        console.log(error);
        return;
      });
   }
   onSubmitAddress() {
   this.modalService.dismissAll();
   console.log(this.editAddressForm.value);
       
   console.log("res:", this.editAddressForm.getRawValue());

   //update de l'utilisateur
   this._userService.updateCustomer(this.selectedUser,this.editAddressForm.value).then(
     () => {
       console.log('tout va bien');
       
       this.ngOnInit();
       this.userUpdateData = true;
       this.userUpdateDataMessage = 'Les modifications ont été sauvegardées';
     },  
     //en cas d'erreur
     (error) => {
       console.log(error);
       return;
     });
  }
  onDisableShipAddress(){
    this.editShipAddress=false;
    this._userService.disableAddress(this.selectedAddress.shippingID).subscribe(
      (data) => { 
        this.getAllShippingsAddress();
      },
      (error) => {
        console.log(error);
      });
  }
  onDisableBillAddress(){
    this.editBillAddress=false;
    this._userService.disableAddress(this.selectedAddress.billingID).subscribe(
      (data) => { 
        this.getAllBillingsAddress();
      },
      (error) => {
        console.log(error);
      });
  }
   onUnableUser(user){
    if(user.isActive==1){
      user.isActive = 0;
    }else{
      user.isActive = 1;
    }
    this._userService.updateUserStatus(user)
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
