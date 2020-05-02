import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomValidators } from 'src/app/helpers/CustomValidators';
import { Customer } from 'src/app/models/customer';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-login-infos',
  templateUrl: './edit-login-infos.component.html',
  styleUrls: ['./edit-login-infos.component.css']
})
export class EditLoginInfosComponent implements OnInit {
  editRegisterForm: FormGroup;
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

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loading=false;
    this.submitted = false;
    
    this.editRegisterForm = this.formBuilder.group({
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
    }
      , {
        validator: CustomValidators.passwordMatchValidator
      });
    //Appel au service qui retourne les infos personnelles du clients
    this._userService.getCustomer(this.currentUsername).subscribe(
      (data = new Customer) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues au formulaire
        this.usernameData = data.Username;
        console.log(this.usernameData);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
    
    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  get f() { return this.editRegisterForm.controls; }
  openModal(targetModal) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'md'
    });
    
   }
   onUsernameChange() {
    if (!this.changeUsername) {
      this.editRegisterForm.get('Username').enable();
      this.changeUsername = true;
    } else {
      this.changeUsername = false;
    }
    
    console.log(this.changeUsername);
    return this.changeUsername;
    
  }
  onPasswordChange() {
    if (!this.changePassword) {
      this.editRegisterForm.get('myPassword').enable();
      this.editRegisterForm.get('password').enable();
      this.editRegisterForm.get('confirmPassword').enable();
      this.changePassword = true;
    } else {
      this.changePassword = false;
    }
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
    this.user.username =this.currentUsername;
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
    if(!this.changePassword){
      this.editRegisterForm.get('myPassword').disable();
      this.editRegisterForm.get('password').disable();
      this.editRegisterForm.get('confirmPassword').disable();
    }
    if(!this.changeUsername){
      this.editRegisterForm.get('Username').disable();
    }
    if(!this.isUserValid){
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
        this._userService.updateCustomer(this.currentUsername,this.editRegisterForm.value).then(
          () => {
            console.log('tout va bien');
            if(this.editRegisterForm.value.Username != null){
              this.currentUsername = this.editRegisterForm.value.Username;
              let localStorageData = JSON.parse(localStorage.getItem('currentUser'));
              localStorageData.login = this.currentUsername;
              localStorage.setItem('currentUser', JSON.stringify(localStorageData));
              console.log(localStorageData);              
              this.authenticationService.currentUserValue.login = this.currentUsername;
            }
            console.log(this.currentUsername);
            
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
