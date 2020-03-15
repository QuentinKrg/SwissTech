import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { CustomValidators } from '../../../helpers/CustomValidators';
import { User } from 'src/app/models/user';
import * as CryptoJS from 'crypto-js';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editRegisterForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  ariaOneisExpended;
  user = new User;
  haveUser: String;
  usernameErrorMessage: String;
  isUserValid = true;
  usernameData;
  passwordErrorMessage: String;
  isPasswordCorrect =false;
  changeUsername = false;
  changePassword= false;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    this.editRegisterForm = this.formBuilder.group({
      CustomerTitre: ['', Validators.required],
      CustomerName: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      CustomerLastName: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      CustomerBirthday: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      checkbox_address: [''],
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      CustomerEmail: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z - 0-9 ]*')]],
      myPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]],
      password: [
        null,
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

    const currentUsername = this.authenticationService.currentUserValue.login;
    console.log(currentUsername);

    this._userService.getCustomer(currentUsername).subscribe(
      (data = new Customer) => {
        this.f.CustomerTitre.setValue(data.CustomerTitre);
        this.f.CustomerName.setValue(data.CustomerName);
        this.f.CustomerLastName.setValue(data.CustomerLastName);
        this.f.CustomerBirthday.setValue(data.CustomerBirthday);
        this.f.CustomerEmail.setValue(data.CustomerEmail);
        this.f.CustomerPhone.setValue(data.CustomerPhone);
        this.usernameData = data.Username;
        //this.f.username.setValue(data.Username);
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });

    this._userService.getShippingAddress(currentUsername).subscribe(
      (data = new Customer) => {
        this.f.shippingAddress.setValue(data.shippingAddress);
        this.f.shippingCity.setValue(data.shippingCity);
        this.f.shippingZip.setValue(data.shippingZip);
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });

    this._userService.getBillingAddress(currentUsername).subscribe(
      (data = new Customer) => {
        this.f.billingAddress.setValue(data.billingAddress);
        this.f.billingCity.setValue(data.billingCity);
        this.f.billingZip.setValue(data.billingZip);
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });

    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.editRegisterForm.get('username').disable();
    this.editRegisterForm.get('myPassword').disable();
    this.editRegisterForm.get('password').disable();
    this.editRegisterForm.get('confirmPassword').disable();
  }

  get f() { return this.editRegisterForm.controls; }

  onUsernameChange() {
    if (!this.changeUsername) {
      this.changeUsername = true;
      this.editRegisterForm.get('username').enable();
    } else {
      this.changeUsername = false;
      this.editRegisterForm.get('username').disable();
    }
    return this.changeUsername;
  }
  onPasswordChange() {
    if (!this.changePassword) {
      this.changePassword = true;
      this.editRegisterForm.get('myPassword').enable();
      this.editRegisterForm.get('password').enable();
      this.editRegisterForm.get('confirmPassword').enable();
    } else {
      this.changePassword = false;
      this.editRegisterForm.get('myPassword').disable();
      this.editRegisterForm.get('password').disable();
      this.editRegisterForm.get('confirmPassword').disable();
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
    this.user.username = this.editRegisterForm.value.username;
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

  onPasswordTest() {
    
    this.editRegisterForm.value.myPassword = CryptoJS.SHA256(this.editRegisterForm.value.myPassword).toString();

    this._userService.checkPassword(this.usernameData,this.editRegisterForm.value.myPassword).then(
      () => {
        this.passwordErrorMessage = "Mot de passe incorrect";
        this.isPasswordCorrect = false;
      },
      (error) => {
        this.passwordErrorMessage = "";
        this.isPasswordCorrect = true;
      }
    );
  }

  onSubmit() {

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
    
    //Hash le mot de passe reçu avant l'envoyer au backend
    this.editRegisterForm.value.password = CryptoJS.SHA256(this.editRegisterForm.value.password).toString();
    //désactive le bouton d'enregistrement
    this.loading = true;
    console.log(this.editRegisterForm.value);
    console.log(this.user);

    //vérifie que le nom d'utilisateur est disponible
    
        //si crée un nouveau client
        this._userService.addCustomer(this.editRegisterForm.value).then(
          () => {
            console.log('tout va bien');
            
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

