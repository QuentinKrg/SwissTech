import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css']
})

export class ManageCustomersComponent implements OnInit {
  //icones
  faEllipsisV = faEllipsisV;

  //Lock
  isLocked = false;
  LockedBy: String;
  loading = false;
  //Propriétés et variables d'édition et filtrage
  submitted: boolean;
  user = new User;
  isUserValid = true;
  allCustomers: Customer[];
  selectedUser: string;
  selectedUserID: number;
  editProfileForm: FormGroup;
  filterValue: Array<any> = [];
  filterText: string = "";
  selectedStatus: number = -1
  //Pagination
  pageSize: number;
  itemsPerPage: number;
  //Adresses
  editAddressForm: FormGroup;
  myShipAddr: Customer[];
  myBillAddr: Customer[];
  editShipAddress: boolean;
  editBillAddress: boolean;
  selectedAddress: Customer;
  //Alertes
  usernameErrorMessage: String;
  userUpdateDataMessage: String;
  userUpdateData: boolean;
  constructor(
    private _userService: UserService,
    private _fb: FormBuilder,
    private _modalService: NgbModal,
    private _authenticationService: AuthenticationService) {

  }
  //utilisateur actuel
  currentUsername = this._authenticationService.currentUserValue.login;
  ipaddr = this._authenticationService.currentUserValue.IP_ADDR;
  ngOnInit() {
    window.scroll(0,0);
    //Re / initialise les variables
    this.userUpdateData = false;
    this.submitted = false;
    this.editShipAddress = false;
    this.editBillAddress = false;

    //ReactiveForm pour l'edition des adresses
    this.editAddressForm = this._fb.group({
      FullName: ['', Validators.required],
      CustomerTitle: ['', Validators.required],
      shippingID: [''],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      billingID: [''],
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
    });
    //ReactiveForms pour l'edition des infos d'un client
    this.editProfileForm = this._fb.group({
      FK_Title: ['', Validators.required],
      CustomerName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerLastName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerBirthday: ['', Validators.required],
      CustomerSince: [''],
      IpAddress: [''],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]],
      CustomerEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      Username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

    });
    //Récupère les clients retournés par la fonction getCustomers
    this.getCustomers();
    //De base touts les champs d'edition d'adresse sont désactivés
    this.editAddressForm.get('CustomerTitle').disable();
    this.editAddressForm.get('FullName').disable();
    this.editAddressForm.get('shippingID').disable();
    this.editAddressForm.get('billingID').disable();
    this.editAddressForm.get('shippingAddress').disable();
    this.editAddressForm.get('shippingCity').disable();
    this.editAddressForm.get('shippingZip').disable();
    this.editAddressForm.get('billingAddress').disable();
    this.editAddressForm.get('billingCity').disable();
    this.editAddressForm.get('billingZip').disable();
  }
 //Control des formulaires
  get f() { return this.editProfileForm.controls; }
  get f2() { return this.editAddressForm.controls; }

  // Filtrer les articles par status 
  filteredByStatus() {
    this.allCustomers = this.filterValue;

    if (this.selectedStatus == -1) {
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
//Pagination - Changement de page
  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }
//Pagination - Changement de nombre d'items par page
  changePagesize(num) {
    this.itemsPerPage = num;

  }
//Fonction d'appel au service qui retourne tous les clients en BD
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
  //à l'ouverture d'un modal
  openModal(targetModal, user) {
    //Paramètres du modal
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    //L'user sélectionné et ses adresses
    this.selectedUser = user.Username;
    this.selectedUserID = user.id_user;
    this.getAllShippingsAddress();
    this.getAllBillingsAddress();

    //Affecte les données client de la liste des clients au formulaire
    this.editProfileForm.patchValue({
      FK_Title: user.FK_Title,
      CustomerName: user.CustomerName,
      CustomerLastName: user.CustomerLastName,
      CustomerBirthday: user.CustomerBirthday,
      CustomerEmail: user.CustomerEmail,
      CustomerPhone: user.CustomerPhone,
      Username: user.Username,
      CustomerSince: user.CustomerSince,
      IpAddress: this.ipaddr
    });
    //Vérifie si quelqu'un est en train de modifier ce formulaire
    this.onCheckLock();
  }
  //à la fermeture d'un modal on réinitialise le component 
  closeModal() {
    //le formulair doit pouvoir être modifer par autre user
    this.onReleaseLock();
    this._modalService.dismissAll();
    this.ngOnInit();
  }
  //Fonction qui retourne toutes les adresses de livraison
  getAllShippingsAddress() {
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._userService.getAllShippingsAddress(this.selectedUser).subscribe(
      (data: Customer[]) => {
        this.myShipAddr = data;
        this.myShipAddr = this.myShipAddr;
        console.log(data);

      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
  }
  //Fonction qui retourne toutes les adresses de facturation
  getAllBillingsAddress() {
    //Service qui retourne l'adresse de facturation et assigne les données au formulaire
    this._userService.getAllBillingsAddress(this.selectedUser).subscribe(
      (data: Customer[]) => {
        this.myBillAddr = data;
        this.myBillAddr = this.myBillAddr;
        console.log(data);

      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
  }
  //Si l'admin choisit de modifier une adresse de livraison
  onShipAddressChange(address) {
    //On affiche le form dans la vue
    this.editShipAddress = true;
    //on active les champs voulus
    this.editAddressForm.get('CustomerTitle').enable();
    this.editAddressForm.get('FullName').enable();
    this.editAddressForm.get('shippingID').enable();
    this.editAddressForm.get('shippingAddress').enable();
    this.editAddressForm.get('shippingCity').enable();
    this.editAddressForm.get('shippingZip').enable();
    //On récupère l'adresse sélectionnée sur la liste
    this.selectedAddress = JSON.parse(address);
    //on affiche les valeur actuelles
    this.editAddressForm.patchValue({
      CustomerTitle: this.selectedAddress.FK_Title,
      FullName: this.selectedAddress.FullName,
      shippingID: this.selectedAddress.shippingID,
      shippingAddress: this.selectedAddress.shippingAddress,
      shippingCity: this.selectedAddress.shippingCity,
      shippingZip: this.selectedAddress.shippingZip
    });
  }
  //Si l'admin choisit de modifier une adresse de facturation
  onBillAddressChange(address) {
    //On affiche le form dans la vue
    this.editBillAddress = true;
    //on active les champs voulus
    this.editAddressForm.get('CustomerTitle').enable();
    this.editAddressForm.get('FullName').enable();
    this.editAddressForm.get('billingID').enable();
    this.editAddressForm.get('billingAddress').enable();
    this.editAddressForm.get('billingCity').enable();
    this.editAddressForm.get('billingZip').enable();
    //On récupère l'adresse sélectionnée sur la liste
    this.selectedAddress = JSON.parse(address);
    //on affiche les valeur actuelles
    this.editAddressForm.patchValue({
      CustomerTitle: this.selectedAddress.FK_Title,
      FullName: this.selectedAddress.FullName,
      billingID: this.selectedAddress.billingID,
      billingAddress: this.selectedAddress.billingAddress,
      billingCity: this.selectedAddress.billingCity,
      billingZip: this.selectedAddress.billingZip
    });
  }
  //Envoi du formulaire d'edition client
  onSubmit() {
    this.submitted = true;
    if (this.editProfileForm.invalid) {
      return;
    }
    console.log(this.selectedUser);

    this._modalService.dismissAll();
    console.log(this.editProfileForm.value);

    console.log("res:", this.editProfileForm.getRawValue());

    //update de l'utilisateur
    this._userService.updateCustomer(this.selectedUser, this.editProfileForm.value).then(
      () => {
        console.log('tout va bien');
        if (this.editProfileForm.value.Username != null) {
          this.selectedUser = this.editProfileForm.value.Username;
        }
        this.ngOnInit();
        this.userUpdateData = true;
        this.userUpdateDataMessage = 'Les modifications ont été sauvegardées';
      },
      //en cas d'erreur
      (error) => {

        this.submitted = false;
        console.log(error);
        return;
      });
  }
  //Envoi du formulaire d'edition d'adresse
  onSubmitAddress() {

    this.submitted = true;
    if (this.editAddressForm.invalid) {
      return;
    }
    this._modalService.dismissAll();
    console.log(this.editAddressForm.value);

    console.log("res:", this.editAddressForm.getRawValue());

    //update de l'utilisateur
    this._userService.updateCustomer(this.selectedUser, this.editAddressForm.value).then(
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
  //fonction permettant de désactiver une adresse de livraison
  onDisableShipAddress() {
    this.editShipAddress = false;
    this._userService.disableAddress(this.selectedAddress.shippingID).subscribe(
      (data) => {
        this.getAllShippingsAddress();
      },
      (error) => {
        console.log(error);
      });
  }
  //fonction permettant de désactiver une adresse de facturation
  onDisableBillAddress() {
    this.editBillAddress = false;
    this._userService.disableAddress(this.selectedAddress.billingID).subscribe(
      (data) => {
        this.getAllBillingsAddress();
      },
      (error) => {
        console.log(error);
      });
  }
//Fonctin permettant de désactiver ou activer un utilisateur 
  onUserStatus(user) {
    if (user.isActive == 1) {
      user.isActive = 0;
    } else {
      user.isActive = 1;
    }
    //Service qui met à jour le champ statu d'un client dans la DB à l'aide du back-end
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
  //live validation pour voir si le nom d'utilisateur est disponible et avertir l'utilisateur
  isUserAvailable() {
    if (this.selectedUser == this.editProfileForm.value.Username) {
      //pas de changement d'username, donc pas besoin de test
    } else {
      this.user.username = this.editProfileForm.value.Username;
      //envoi de l'username saisi au backend via le service checkUserByUsername
      this._userService.checkUserByUsername(this.user).then(
        () => {
          this.usernameErrorMessage = "";
          this.isUserValid = true;
        },
        (error) => {
          //si une erreur est retournée, l'username n'est pas disponible
          this.usernameErrorMessage = "Nom d'utilisateur non disponible";
          this.isUserValid = false;
        }
      );
    }

  }
  //Insertion d'un lock dans la BD via le service AddLock selon l'ID de l'user saisi
  onAcquireLock() {
    this._userService.AddLock(this.selectedUserID, this.currentUsername).subscribe((data) => {
    },
      (error) => {
        console.log(error);
      });
    console.log('libre pour edition');
  }
//Vérifie si un utilisateur peut être modifié ou s'il y a un lock pour l'edition
  onCheckLock() {
    this._userService.CheckLock(this.selectedUserID).subscribe((data: Customer) => {
      //Récupère le nom d'utilisateur si présent pour cet article
      this.LockedBy = data.LockedBy;

      //Vérifie si un lock est présent
      if (data) {
        //Vérifie si l'utilisateur actuel est le proprietaire du lock
        if (this.currentUsername === this.LockedBy) {
          //Si oui met à jour le locktime
          this._userService.UpdateLock(this.selectedUserID).subscribe((data) => {
          },
            (error) => {
              console.log(error);
            });
          this.LockedBy = this.currentUsername;
          console.log('vous avez le lock');
          this.isLocked = false;
        }
        //Si non affiche un message avec le nom du proprietaire du lock
        //désactive le bouton de submit
        if (this.currentUsername != this.LockedBy) {
          console.log('Verrouillé par ' + this.LockedBy);
          this.isLocked = true;
          this.loading = false;
        }
      }
      //Si aucun lock est présent,en ajoute un.
      else {
        this.onAcquireLock();
        this.isLocked = false;
      }
    },
      (error) => {
        console.log(error);
      });
  }
//Libère l'user en question pour être modifier par autres
  onReleaseLock() {
    this._userService.ReleaseLock(this.selectedUserID, this.currentUsername).subscribe((data) => {
    },
      (error) => {
        console.log(error);
      });
  }
//Fonction permettant de forcer la suppression d'un lock sur un user
  onForceReleaseLock() {
    this._userService.ForceReleaseLock(this.selectedUserID).subscribe(() => {
      this.isLocked = false;
      this.onAcquireLock();
    },
      (error) => {
        console.log(error);
      });

  }
  //Récupère la taille de la page
  pageSizeEvent($event) {
    this.pageSize = $event;
  }
  //Récupère le nombre d'item par page
  itemsPerPageEvent($event) {
    this.itemsPerPage = $event;
  }
}
