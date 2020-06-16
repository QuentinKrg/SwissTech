import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faMapMarkerAlt, faFileInvoice,faPlus} from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle,faCircle,faTrashAlt,faEdit} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  //icones
  faMapMarkerAlt = faMapMarkerAlt;
  faFileInvoice = faFileInvoice;
  faCheckCircle = faCheckCircle;
  faCircle=faCircle;
  faPlus=faPlus;
  faTrashAlt=faTrashAlt;
  faEdit=faEdit;

  //Propriétés et variables
  addressType: number;
  isDefault:number;
  myShipAddr: Customer[];
  myBillAddr: Customer[];
  selectedAddress: Customer = new Customer;
  editShippingAddrForm: FormGroup;
  editBillingAddrForm: FormGroup;
  AddAddrForm: FormGroup;
  loading;
  submitted;
  returnUrl: string;
  userUpdateDataMessage: String;
  userUpdateData:boolean;
  FormErrorMessage: String;
  FormError:boolean;
  currentUsername = this._authenticationService.currentUserValue.login;

  constructor(private formBuilder: FormBuilder,
    private _userService: UserService,
    private _modalService: NgbModal,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    //Re/initialisation des variables
    this.userUpdateData=false;
    this.FormError=false;
    this.loading = false;
    this.submitted = false;

    //Création d'un active form pour l'ajout d'adresse
    this.AddAddrForm = this.formBuilder.group({
      CustomerTitle: ['-1', Validators.required],
      FullName: ['', Validators.required],
      addressType: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    //Création d'un reactive form pour l'édition d'une adresse de livraison
    this.editShippingAddrForm = this.formBuilder.group({
      shippingID: [''],
      CustomerTitle: ['-1', Validators.required],
      FullName: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    //Création d'un reactive form pour l'édition d'une adresse de facturation
    this.editBillingAddrForm = this.formBuilder.group({
      billingID: [''],
      CustomerTitle: ['-1', Validators.required],
      FullName: ['', Validators.required],
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    //Récupère toutes les adresses de l'user
    this.getAllBillingsAddress();
    this.getAllShippingsAddress();
  }
  //Création des controles de chaque formulaire
  get f() { return this.editShippingAddrForm.controls; }
  get f2() { return this.editBillingAddrForm.controls; }
  get f3() { return this.AddAddrForm.controls; }

  //Fonction d'appel au service qui retourne toutes les adresses de Livraison
  getAllShippingsAddress() {
    this._userService.getAllShippingsAddress(this.currentUsername).subscribe(
      (data: Customer[]) => {
        this.myShipAddr = data;
        this.myShipAddr = this.myShipAddr;
        console.log(data);
        console.log(this.myShipAddr);
        

      },
      (error) => {
        console.log(error);
      });
  }
  //Fonction d'appel au service qui retourne toutes les adresses de facturation
  getAllBillingsAddress() {
    this._userService.getAllBillingsAddress(this.currentUsername).subscribe(
      (data: Customer[]) => {
        this.myBillAddr = data;
        this.myBillAddr = this.myBillAddr;
        console.log(data);

      },
      (error) => {
        console.log(error);
      });
  }
  //Fonction pour lancer un modal d'édition d'une adresse
  openModal(targetModal, addr) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    //Assinge les données voulues au formulaire
    this.f.CustomerTitle.setValue(addr.FK_Title);
    this.f2.CustomerTitle.setValue(addr.FK_Title);
    this.f.shippingID.setValue(addr.shippingID);
    this.f.FullName.setValue(addr.FullName);
    this.f.shippingAddress.setValue(addr.shippingAddress);
    this.f.shippingCity.setValue(addr.shippingCity);
    this.f.shippingZip.setValue(addr.shippingZip);
    this.f2.billingID.setValue(addr.billingID);
    this.f2.FullName.setValue(addr.FullName);
    this.f2.billingAddress.setValue(addr.billingAddress);
    this.f2.billingCity.setValue(addr.billingCity);
    this.f2.billingZip.setValue(addr.billingZip);

    this.addressType=addr.addressType;
    this.isDefault= addr.isDefault;
  }
  //Fonction de fermeture d'un Modal
  closeModal(){
    this._modalService.dismissAll();
    //Appel à onInit pour réinitialiser la page
    this.ngOnInit();
  }
  //Fonction pour lancer le modal d'ajout d'adresse
  openModalAddAddress(targetModal) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
  }
  //Envoi du formulaire d'édition d'une adresse de livraison
  onSubmitShippingAddresse() {

    //Stop si le formulaire n'est pas valide
    if (this.editShippingAddrForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.editShippingAddrForm.invalid) {
      this.userUpdateData = false;
      this.FormError = true;
      this.FormErrorMessage = "Veuillez remplir correctement tous les champs marqués d'un *";
      return;
    } else {
      this.FormError = false;
      this.FormErrorMessage = "";
    }

    //désactive le bouton d'enregistrement
    this.loading = true;


    //update de l'adresse
    this._userService.updateCustomer(this.currentUsername, this.editShippingAddrForm.value).then(
      () => {
        console.log('tout va bien');
        if (this.editShippingAddrForm.value.Username != null) {
          this.currentUsername = this.editShippingAddrForm.value.Username;
          let localStorageData = JSON.parse(localStorage.getItem('currentUser'));
          localStorageData.login = this.currentUsername;
          localStorage.setItem('currentUser', JSON.stringify(localStorageData));
          console.log(localStorageData);
          this._authenticationService.currentUserValue.login = this.currentUsername;
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

    this._modalService.dismissAll();
  }
  //Envoi du formulaire d'édition d'une adresse de facturation
  onSubmitBillingAddresse() {

    //Stop si le formulaire n'est pas valide
    if (this.editBillingAddrForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.editBillingAddrForm.invalid) {
      this.userUpdateData = false;
      this.FormError = true;
      this.FormErrorMessage = "Veuillez remplir correctement tous les champs marqués d'un *";
      return;
    } else {
      this.FormError = false;
      this.FormErrorMessage = "";
    }

    //désactive le bouton d'enregistrement
    this.loading = true;


    //update de l'adresse
    this._userService.updateCustomer(this.currentUsername, this.editBillingAddrForm.value).then(
      () => {
        console.log('tout va bien');
        if (this.editBillingAddrForm.value.Username != null) {
          this.currentUsername = this.editBillingAddrForm.value.Username;
          let localStorageData = JSON.parse(localStorage.getItem('currentUser'));
          localStorageData.login = this.currentUsername;
          localStorage.setItem('currentUser', JSON.stringify(localStorageData));
          console.log(localStorageData);
          this._authenticationService.currentUserValue.login = this.currentUsername;
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

    this._modalService.dismissAll();
  }
  //Envoi du formulaire d'ajout d'adresse
  onSubmitAddAddresse() {
    //Stop si le formulaire n'est pas valide
    if (this.AddAddrForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.AddAddrForm.invalid) {
      this.userUpdateData = false;
      this.FormError = true;
      this.FormErrorMessage = "Veuillez remplir correctement tous les champs marqués d'un *";
      return;
    } else {
      this.FormError = false;
      this.FormErrorMessage = "";
    }

    //désactive le bouton d'enregistrement
    this.loading = true;
    //Appel au service addAddress pour envoyer les données
    this._userService.addAddress(this.currentUsername, this.AddAddrForm.value).subscribe(
      () => {
        //si ok ferme le modal et relance la page
        this.closeModal();
      }, (error) => {
        console.log(error);

      });
  }
  //fonction pour "supprimer" une adresse de livraison
  onDisableShipAddress(id) {
    this._userService.disableAddress(id).subscribe(
      (data) => {
        //récupère la liste de toutes les adresse à jour
        this.getAllShippingsAddress();
        this.addressType=this.myShipAddr[0].addressType;
        this.SetAddressByDefault(this.myShipAddr[1].shippingID);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      });
  }
  //fonction pour "supprimer" une adresse de facturation
  onDisableBillAddress(id) {
    this._userService.disableAddress(id).subscribe(
      (data) => {
        //récupère la liste de toutes les adresse à jour
        this.getAllBillingsAddress();
        this.addressType=this.myBillAddr[0].addressType;
        this.SetAddressByDefault(this.myBillAddr[1].billingID);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      });
  }
  //Fonction pour définir une adresse par défaut depuis un ID sélectionné
  SetAddressByDefault(id){
    this._userService.setAddressByDefault(id,this.addressType,this.currentUsername).subscribe(
      () => {
        this.isDefault= 1;
      },
      (error) => {
        console.log(error);
      });

  }
}
