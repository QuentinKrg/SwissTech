import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomValidators } from 'src/app/helpers/CustomValidators';
import { Customer } from 'src/app/models/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faKey ,faUserEdit} from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle , faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-login-infos',
  templateUrl: './edit-login-infos.component.html',
  styleUrls: ['./edit-login-infos.component.css']
})
export class EditLoginInfosComponent implements OnInit {
  //Icones
  faKey =faKey;
  faUserEdit = faUserEdit;
  faTimesCircle = faTimesCircle;
  faCheckCircle=faCheckCircle;
  
  //propriétés et variables
  editRegisterForm: FormGroup;
  loading;
  submitted;
  user = new User;
  haveUser: String;
  usernameErrorMessage: String;
  userUpdateDataMessage: String;
  userUpdateData:boolean;
  isUserValid: boolean;
  usernameData;
  passwordErrorMessage: String;
  FormErrorMessage: String;
  FormError:boolean;
  isPasswordCorrect:boolean;
  changeUsername: boolean;
  changePassword: boolean;
  currentUsername = this._authenticationService.currentUserValue.login;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _modalService: NgbModal,
    private _authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    //Re/Initialisation des variable
    this.userUpdateData = false;
    this.isPasswordCorrect= false;
    this.isUserValid =true;
    this.FormErrorMessage = "";
    this.FormError= false;
    this.changePassword = false;
    this.changeUsername = false;
    this.loading = false;
    this.submitted = false;
    //Création d'un reactive form + validation des champs
    this.editRegisterForm = this._formBuilder.group({
      Username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      myPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
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
    },
      {
        validator: CustomValidators.passwordMatchValidator
      });
    //Appel au service qui retourne les infos personnelles du clients
    this._userService.getCustomer(this.currentUsername).subscribe(
      (data = new Customer) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues au formulaire
        this.usernameData = data.Username;
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
    //Au lancement les champs sont désactivés
    this.editRegisterForm.get('myPassword').disable();
    this.editRegisterForm.get('password').disable();
    this.editRegisterForm.get('confirmPassword').disable();
    this.editRegisterForm.get('Username').disable();
  }
  //Création d'un controleur de formulaire
  get f() { return this.editRegisterForm.controls; }
  //Fonction pour ouvrir un modal
  openModal(targetModal) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
  }
  //Fonction pour fermer les modals
  closeModal() {
    this._modalService.dismissAll();
    this.ngOnInit();
  }
  //Fonction permettant de changer l'username
  onUsernameChange() {
    //Active le champ username
    this.editRegisterForm.get('Username').enable();
    this.changeUsername = true;
  }
  //Fonction permettant de changer le mot de passe
  onPasswordChange() {
    //Active les champs de mot de passe
      this.editRegisterForm.get('myPassword').enable();
      this.editRegisterForm.get('password').enable();
      this.editRegisterForm.get('confirmPassword').enable();
      this.changePassword = true;
  }
  //live validation pour voir si le nom d'utilisateur est disponible et avertir l'utilisateur
  isUserAvailable() {
    this.user.username = this.editRegisterForm.value.Username;
    this._userService.checkUserByUsername(this.user).then(
      () => {
        this.usernameErrorMessage = "";
        this.isUserValid = true;
      },
      (error) => {
        this.usernameErrorMessage = "Nom d'utilisateur non disponible";
        this.isUserValid = false;
      }
    );
  }
  //live validation du mot de passe avant de le changer
  onPasswordTest() {
    //Recupere le nom de l'utilisateur connecté
    this.user.username = this.currentUsername;
    //Recurpère le mot de passe saisi
    this.user.password = this.editRegisterForm.value.myPassword;

    this._userService.checkPassword(this.user).then(
      () => {
        this.passwordErrorMessage = "";//Si pas de message d'erreur en retour, le mot de passe est valide
        this.isPasswordCorrect = true;
      },
      (error) => {
        this.passwordErrorMessage = "Mot de passe incorrect"; // si le mot de passe est invalide
        this.isPasswordCorrect = false;
      }
    );
  }

  onSubmit() {
    console.log(this.editRegisterForm);
    
    //Une fois le bouton pressé:
    this.submitted = true;
    //Stop si l'utilisateur n'est pas disponible
    if (!this.isUserValid) {
      this.loading = false;
      this.submitted = false;
      return;
    }

    //Stop si le formulaire n'est pas valide
    if (this.editRegisterForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.editRegisterForm.invalid) {
      this.submitted = false;
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

    //vérifie que le nom d'utilisateur est disponible

    //update de l'utilisateur envoie des données du formulaire via le servie :
    this._userService.updateCustomer(this.currentUsername, this.editRegisterForm.value).then(
      () => {
        //si l'username a été modifier on met à jour dans le local storage de l'user
        if (this.editRegisterForm.value.Username != null) {
          this.currentUsername = this.editRegisterForm.value.Username;
          let localStorageData = JSON.parse(localStorage.getItem('currentUser'));
          localStorageData.login = this.currentUsername;
          localStorage.setItem('currentUser', JSON.stringify(localStorageData));
          this._authenticationService.currentUserValue.login = this.currentUsername;
        }
        this.closeModal();
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
  }
}
