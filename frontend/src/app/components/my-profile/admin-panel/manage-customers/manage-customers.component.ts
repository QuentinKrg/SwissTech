import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'src/app/helpers/CustomValidators';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})

export class ManageCustomersComponent implements OnInit {

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
  constructor(
    private _userService: UserService,private fb: FormBuilder, private modalService: NgbModal  ) {

  }

  //Fonction pour la recherche dans la liste des clients
  filterByText(initial: string) {

    this.allCustomers = this.filterValue;// réinitialise si on efface la recherche

    //condition permetant de rechercher dans les utilisateur actifs uniquement
    if(this.isChecked){
      this.allCustomers = this.allCustomers.filter(i => i.isActive == 1);
     }else{
      this.allCustomers = this.filterValue;// réinitialise si on efface la recherche
     }
    //Fonction filter ciblant l'array retournée par la requette au backend, plus précisément le nom d'utilisateur.
    //initial c'est la lettre tappée par l'admin dans le champ de recherche.
    this.allCustomers = this.allCustomers.filter(i => i.Username.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
  }
  
  filterByStatus() {
    this.element = <HTMLInputElement> document.getElementById("checkbox_status");
    this.isChecked = this.element.checked;
   if(this.isChecked){
    this.allCustomers = this.allCustomers.filter(i => i.isActive == 1);
   }else{
    this.allCustomers = this.filterValue;
   }
    
  }
  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage*(pageNum - 1);
  }
  
  changePagesize(num) {
  this.itemsPerPage =  num;
  
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

    this.editProfileForm.patchValue({
      CustomerTitre: user.CustomerTitre ,
      CustomerName: user.CustomerName,
      CustomerLastName: user.CustomerLastName,
      CustomerBirthday: user.CustomerBirthday,
      shippingAddress: user.shippingAddress,
      shippingCity: user.shippingCity,
      shippingZip: user.shippingZip,
      checkbox_address: user.checkbox_address,
      billingAddress: user.billingAddress,
      billingCity: user.billingCity,
      billingZip: user.billingZip,
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
