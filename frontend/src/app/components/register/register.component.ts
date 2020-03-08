import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { CustomValidators } from '../../helpers/CustomValidators';
import { User } from 'src/app/models/user';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  ariaOneisExpended;
  user = new User;
  haveUser: String;
  usernameErrorMessage: String;
  // --------------------------------Captcha---------------------------------------------------
  userCaptcha: String;
  captchaIsValid = false;
  captchaGenerated: string;
  // --------------------------------/Captcha---------------------------------------------------
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }


  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      titre: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      birthday: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      checkbox_address: [''],
      billingAddress: ['', Validators.required],
      billingAddressCity: ['', Validators.required],
      billingAddressZip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z - 0-9 ]*')]],
      confirmPassword: ['', [Validators.required]],
      privatephone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]],
      userEnteredCaptcha: ['', [Validators.required]],
      generalConditions: ['', Validators.required],
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
    this.generateCaptchaImage();
    this.userCaptcha = this.registerForm.value.userEnteredCaptcha;
    console.log(this.captchaGenerated);

    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.registerForm.controls; }

  onSameAddressCheck() {//Fonction pour copier l'addresse livraison... uniquement l'affichage HTML
    //Recuperation des element input du form
    const bilAddressValue = <HTMLInputElement>document.getElementById("billingAddress");
    const shipAddressValue = <HTMLInputElement>document.getElementById("shippingAddress");
    const bilCityValue = <HTMLInputElement>document.getElementById("billingCity");
    const shipCityValue = <HTMLInputElement>document.getElementById("shippingCity");
    const shipZipValue = <HTMLInputElement>document.getElementById("shippingZip");
    const bilZipValue = <HTMLInputElement>document.getElementById("billingZip");
    //si la checkbox est cochée copie les valeurs et désactive les inputs en question
    if (this.registerForm.value.checkbox_address == true) {

      bilAddressValue.value = shipAddressValue.value;
      bilZipValue.value = shipZipValue.value;
      bilCityValue.value = shipCityValue.value;

      this.registerForm.get('billingAddress').disable();
      this.registerForm.get('billingAddressCity').disable();
      this.registerForm.get('billingAddressZip').disable();
    }
    else {//sinon vide les inputs et les activent
      bilAddressValue.value = '';
      bilCityValue.value = '';
      bilZipValue.value = '';
      this.registerForm.get('billingAddress').enable();
      this.registerForm.get('billingAddressCity').enable();
      this.registerForm.get('billingAddressZip').enable();
    }

  }


  // --------------------------------Captcha---------------------------------------------------
  //fonction qui retourne un array de string, longeur selon paramètre
  generateText(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  //Genere le contenu à ajouter dans le canvas
  generateCaptchaImage() {

    this.captchaGenerated = this.generateText(6);//genere un string aléatoire avec n caractères
    const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');//Crée une tag canvas pour HTML
    const ctx = canvas.getContext('2d');

    //Génère un nombre aléatoire
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    //Génère des rectangles aléatoires (taille et couleur)
    for (var j = 1; j < 60; j++) {
      ctx.save();
      ctx.lineWidth = getRandomInt(3, 20);
      ctx.strokeStyle = 'rgb(' + getRandomInt(133, 211) + ',' +
        getRandomInt(133, 211) + ',' + getRandomInt(133, 211) + ')';
      ctx.strokeRect(getRandomInt(-5, 200), 1, getRandomInt(20, 60), getRandomInt(35, 70))
      ctx.restore();
    }
    ctx.globalCompositeOperation = "source-atop";//Définit quel contexte va apparaître en tout premier sur le canvas

    //Définit le style du text et l'affiche dans le canvas
    ctx.shadowColor = 'gray';
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 0;
    ctx.font = "34px Arial";
    ctx.lineWidth = 1.5;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(this.captchaGenerated, 30, 33);
    ctx.textAlign = 'center';

  }
  // Refresh le canvas HTML 
  onRefresh() {
    //Cost canvas pour avoir accès à l'element HTML
    const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    // met à jour la taille du canvas pour rafrechir le captcha
    canvas.width += 0;
    //regénére l'image
    this.generateCaptchaImage();
    console.log(this.captchaGenerated);
  }

  //Fontion utile pour valider le champ captcha au moment de la saisie 
  isValid(userCaptcha) {
    this.captchaIsValid = false;
    if (userCaptcha != this.captchaGenerated) {
      this.captchaIsValid = false;
    } else {
      this.captchaIsValid = true;
    }
    return this.captchaIsValid;
  }
  // --------------------------------/Captcha---------------------------------------------------

  onSubmit() {
    // ------------------------Captcha---------------------------------------
    //Stop si le captcha saisit ne match pas avec celui qui a été généré au moment du submit
    this.submitted = true;
    if (this.isValid(this.registerForm.value.userEnteredCaptcha)) {
    } else {
      return;
    }
    // ----------------------------/Captcha-----------------------------------

    //Stop si le formulaire n'est pas valide
    if (this.registerForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.registerForm.invalid) {
      return;
    }

    //Récupère les identifiant pour le login
    this.user.username = this.registerForm.value.username;
    this.user.password = this.registerForm.value.password;
    //Hash le mot de passe reçu avant l'envoyer au backend
    this.registerForm.value.password = CryptoJS.SHA256(this.registerForm.value.password).toString();
    //désactive le bouton d'enregistrement
    this.loading = true;
    console.log(this.registerForm.value);
    console.log(this.user);

    //vérifie que le nom d'utilisateur est disponible
    this._userService.getUserByUsername(this.user).then(
      ()=>{
        //si crée un nouveau client
        this._userService.addCustomer(this.registerForm.value).then(
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
      
    )
    
  }
}
