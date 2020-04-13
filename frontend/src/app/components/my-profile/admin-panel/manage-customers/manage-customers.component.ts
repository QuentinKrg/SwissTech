import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';

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


  filterValue: Array<any> = [];
  constructor(
    private _userService: UserService, ) {

  }

  //Fonction pour la recherche dans la liste des clients
  filterByText(initial: string) {

    this.allCustomers = this.filterValue;// réinitialise si on efface la recherche
    
    //Fonction filter ciblant l'array retournée par la requette au backend, plus précisément le nom d'utilisateur.
    //initial c'est la lettre tappée par l'admin dans le champ de recherche.
    this.allCustomers = this.allCustomers.filter(i => i.Username.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
  }

  ngOnInit() {
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

}