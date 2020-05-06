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
  
  allCustomers: Customer[];
  currentPage = 1;
  itemsPerPage = 5;
  pageSize: number;
  collectionSize: number;
  
  usernameErrorMessage: String;
  userUpdateDataMessage: String;
  userUpdateData = false;
  selectedUser: string;
  editProfileForm: FormGroup;
  element = <HTMLInputElement> document.getElementById("checkbox_status");
  isChecked:boolean;
  filterValue: Array<any> = [];
  filterText: string = "";
  selectedStatus: number = -1
  constructor(
    private _userService: UserService,private fb: FormBuilder, private modalService: NgbModal  ) {

  }

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      CustomerTitre: ['', Validators.required],
      CustomerName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerLastName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerBirthday: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      checkbox_address: [''],
      CustomerSince: [''],
      IpAddress: [''],
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      CustomerEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]],
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
  
  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'

    });

    this.selectedUser = user.Username;
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
   /* this._userService.getShippingAddress(this.selectedUser).subscribe(
      (data = new Customer) => {
        this.f.shippingAddress.setValue(data.shippingAddress);
        this.f.shippingCity.setValue(data.shippingCity);
        this.f.shippingZip.setValue(data.shippingZip);
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
    //Service qui retourne l'adresse de facturation et assigne les données au formulaire
    this._userService.getBillingAddress(this.selectedUser).subscribe(
      (data = new Customer) => {
        this.f.billingAddress.setValue(data.billingAddress);
        this.f.billingCity.setValue(data.billingCity);
        this.f.billingZip.setValue(data.billingZip);
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      }); */  
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
