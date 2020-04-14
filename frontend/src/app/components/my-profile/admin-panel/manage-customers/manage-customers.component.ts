import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})
export class ManageCustomersComponent implements OnInit {

  allCustomers: Customer[];
  @Input() CustomerTitre: string;
  @Input() CustomerName: string;
  @Input() indexOfCustomer: number;
  @Input() id_customer: number;
  @Input() id_user: number;
  @Input() CustomerLastName: string;
  @Input() isActive: number;

  title = 'modal2';
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

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']
     });
    this.getCustomers();
  }

  getCustomers() {
    //appel àla fonction qui retourne tous les clients de UserService
    this._userService.getAllCustomers().subscribe(
      (data: Customer[]) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues au formulaire
        this.allCustomers = data;
        this.filterValue = this.allCustomers;
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
   
    this.editProfileForm.patchValue({
     firstname: user.CustomerName,
     lastname: user.CustomerLastName,
     username: user.Username,
     email: user.email
    });
   }
   onSubmit() {
    this.modalService.dismissAll();
    console.log("res:", this.editProfileForm.getRawValue());
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
