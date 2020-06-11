import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {

  constructor(private _userService: UserService,
              private _modalService: NgbModal) { }
 //Variables et propriétés
  allAdminUsers: User[] = [];
  allStandartUsers: User[] = [];
  filterValue: Array<any> = [];
  filterText: string = "";

  ngOnInit() {
    //récupère tous les admins
    this.getAllAdminUsers();
  }
  // Récupération des tous les utilisateurs qui sont administrateur
  getAllAdminUsers() {
    this._userService.getAllUsers().subscribe((data) => {
      this.allAdminUsers = data.filter(adm => adm.role == 'AD' && adm.isActive == true);
    });
  }
  // Récupération des tous les utilisateurs qui ne sont pas administrateur
  getAllStandartUsers() {
    this._userService.getAllUsers().subscribe((data) => {
      this.allStandartUsers = data.filter(adm => adm.role == 'ST' && adm.isActive == true);
      this.filterValue = this.allStandartUsers;
    });
  }
  // Enlever le rôle d'administrateur à un utilisateur
  updateUserRole(user: User) {
    if(user.role == 'AD') {
      user.role = 'ST';
      this.allAdminUsers = this.allAdminUsers.filter(usr => usr != user);
    } else if (user.role == 'ST') {
      user.role = 'AD';
      this.allStandartUsers = this.allStandartUsers.filter(usr => usr != user);
      this.filterValue = this.allStandartUsers;
    }

    this._userService.updateUserRole(user).subscribe(() => {
      this.ngOnInit();
    },  
    //en cas d'erreur
    (error) => {
      console.log(error);
      return;
    });
    
  }
  // Méthode qui permet l'ouverture du modal d'ajout d'un administrateur
  openModal(targetModal) {
    // Paramètres du modal
    this._modalService.open(targetModal, {
     centered: true,
     size: 'lg',
     backdrop: 'static',
     scrollable: true
    });

    this.getAllStandartUsers();   
  }
  // Reset des filtres de recherches
  clear() {

  }
  // Filtrer les recherches avec du texte 
  filteredByText() {
    this.allStandartUsers = this.filterValue;

    this.allStandartUsers = this.allStandartUsers.filter(i => i.login.toLowerCase().indexOf(this.filterText.toLocaleLowerCase()) !== -1);
  }
}
