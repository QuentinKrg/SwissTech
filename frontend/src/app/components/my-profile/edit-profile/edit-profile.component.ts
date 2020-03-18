import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CustomValidators } from '../../../helpers/CustomValidators';
import { User } from 'src/app/models/user';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
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
  isPasswordCorrect =false;
  changeUsername = false;
  changePassword= false;
  currentUsername = this.authenticationService.currentUserValue.login;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    this.loading=false;
    this.submitted = false;
    
    this.editRegisterForm = this.formBuilder.group({
      CustomerTitre: ['', Validators.required],
      CustomerName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerLastName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerBirthday: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      checkbox_address: [''],
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      CustomerEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]],
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
        this.f.CustomerTitre.setValue(data.CustomerTitre);
        this.f.CustomerName.setValue(data.CustomerName);
        this.f.CustomerLastName.setValue(data.CustomerLastName);
        this.f.CustomerBirthday.setValue(data.CustomerBirthday);
        this.f.CustomerEmail.setValue(data.CustomerEmail);
        this.f.CustomerPhone.setValue(data.CustomerPhone);
        this.usernameData = data.Username;
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._userService.getShippingAddress(this.currentUsername).subscribe(
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
    this._userService.getBillingAddress(this.currentUsername).subscribe(
      (data = new Customer) => {
        this.f.billingAddress.setValue(data.billingAddress);
        this.f.billingCity.setValue(data.billingCity);
        this.f.billingZip.setValue(data.billingZip);
        console.log(data);
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });

    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
  }

  get f() { return this.editRegisterForm.controls; }

  onUsernameChange() {
    if (!this.changeUsername) {
      this.changeUsername = true;
    } else {
      this.changeUsername = false;
    }
    return this.changeUsername;
    
  }
  onPasswordChange() {
    if (!this.changePassword) {
      this.changePassword = true;
    } else {
      this.changePassword = false;
    }
  }
  onSameAddressCheck() {//Fonction pour copier l'addresse livraison... uniquement l'affichage HTML
    //Recuperation des element input du form
    const bilAddressValue = <HTMLInputElement>document.getElementById("billingAddress");
    const shipAddressValue = <HTMLInputElement>document.getElementById("shippingAddress");
    const bilCityValue = <HTMLInputElement>document.getElementById("billingCity");
    const shipCityValue = <HTMLInputElement>document.getElementById("shippingCity");
    const shipZipValue = <HTMLInputElement>document.getElementById("shippingZip");
    const bilZipValue = <HTMLInputElement>document.getElementById("billingZip");
    //si la checkbox est cochée copie les valeurs et désactive les inputs en question
    if (this.editRegisterForm.value.checkbox_address == true) {

      bilAddressValue.value = shipAddressValue.value;
      bilZipValue.value = shipZipValue.value;
      bilCityValue.value = shipCityValue.value;

      this.editRegisterForm.get('billingAddress').disable();
      this.editRegisterForm.get('billingCity').disable();
      this.editRegisterForm.get('billingZip').disable();
    }
    else {//sinon vide les inputs et les activent
      bilAddressValue.value = '';
      bilCityValue.value = '';
      bilZipValue.value = '';
      this.editRegisterForm.get('billingAddress').enable();
      this.editRegisterForm.get('billingCity').enable();
      this.editRegisterForm.get('billingZip').enable();
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
      return;
    }

    //Stop si le formulaire n'est pas valide
    if (this.editRegisterForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.editRegisterForm.invalid) {
      return;
    }
    
    //désactive le bouton d'enregistrement
    this.loading = true;

    //vérifie que le nom d'utilisateur est disponible
    
        //si crée un nouveau client
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
  }
}

