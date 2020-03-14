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
  userFormData=new Customer;
  shippingAddrData= new Customer;
  billingAddrData= new Customer;
  
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    
 

    this.editRegisterForm = this.formBuilder.group({
      titre: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      birthday: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      checkbox_address: [''],
      billingAddress: ['', Validators.required],
      billingCity: ['', Validators.required],
      billingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      email: ['', [Validators.required, Validators.email]],
      username: [this.userFormData.Username, [Validators.required, Validators.pattern('[a-zA-Z - 0-9 ]*')]],
      myPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      privatephone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]],
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
   (data= new Customer) =>{
     this.f.titre.setValue(data.CustomerTitre);
     this.f.firstname.setValue(data.CustomerName);
     this.f.lastname.setValue(data.CustomerLastName);
     this.f.birthday.setValue(data.CustomerBirthday);
     this.f.email.setValue(data.CustomerEmail);
     this.f.privatephone.setValue(data.CustomerPhone);
     this.f.username.setValue(data.Username);
   },
   (error) =>{
     this.usernameErrorMessage = "Error ";
     console.log(error);
   });

 this._userService.getShippingAddress(currentUsername).subscribe(
    (data= new Customer) =>{
      this.f.shippingAddress.setValue(data.shippingAddress);
      this.f.shippingCity.setValue(data.shippingCity);
      this.f.shippingZip.setValue(data.shippingZip);
    },
    (error) =>{
      this.usernameErrorMessage = "Error ";
      console.log(error);
    });
    
  this._userService.getBillingAddress(currentUsername).subscribe(
      (data= new Customer) =>{
        this.f.billingAddress.setValue(data.billingAddress);
        this.f.billingCity.setValue(data.billingCity);
        this.f.billingZip.setValue(data.billingZip);
      },
      (error) =>{
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
        
    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.editRegisterForm.controls; }

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
  isUserAvailable(){
    this.user.username = this.editRegisterForm.value.username;
    this._userService.checkUserByUsername(this.user).then(
      ()=>{
        this.usernameErrorMessage = "";
        this.isUserValid = true;
      },
      (error) =>{
        this.usernameErrorMessage = "Nom d'utilisateur non disponible";
        this.isUserValid = false;
      }
    );
  }
  
  onSubmit() {

    //Stop si le formulaire n'est pas valide
    if (this.editRegisterForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.editRegisterForm.invalid) {
      return;
    }

    //Récupère les identifiant pour le login
    this.user.username = this.editRegisterForm.value.username;
    this.user.password = this.editRegisterForm.value.password;
    //Hash le mot de passe reçu avant l'envoyer au backend
    this.editRegisterForm.value.password = CryptoJS.SHA256(this.editRegisterForm.value.password).toString();
    //désactive le bouton d'enregistrement
    this.loading = true;
    console.log(this.editRegisterForm.value);
    console.log(this.user);

    //vérifie que le nom d'utilisateur est disponible
    this._userService.checkUserByUsername(this.user).then(
      ()=>{
        //si crée un nouveau client
        this._userService.addCustomer(this.editRegisterForm.value).then(
          () => {
            console.log('tout va bien');
            //si tout va bien le client se connecte directement
            this.authenticationService.login(this.user)
              .subscribe(
                () => {
                  //puis est redirigé vers la page qu'il essayer d'acceder
                  this.router.navigate([this.returnUrl]);
                }
              );
          },
          //en cas d'erreur
          (error) => {
            console.log(error);
            this.submitted = false;
            this.loading = false;
            return;
          });
      },
      (error) =>{
        this.usernameErrorMessage = "Nom d'utilisateur non disponible";
        console.log(error);
        this.submitted = false;
        this.loading = false;
        return;
      }
      
    );
    
  }
}
