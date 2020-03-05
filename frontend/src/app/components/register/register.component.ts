import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { Customer } from 'src/app/models/customer';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { CustomValidators } from '../../helpers/CustomValidators';
import { User } from 'src/app/models/user';

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
  ) {  }
 
  
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      titre: ['', Validators.required],
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z -]*')]],
      birthday: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      shippingCity: ['', Validators.required],
      shippingZip: ['', [Validators.required,Validators.minLength(4) ,Validators.pattern('[0-9 ]*')]],
      checkbox_address: [''],
      billingAddress: ['', Validators.required],
      billingAddressCity: ['', Validators.required],
      billingAddressZip: ['', [Validators.required,Validators.minLength(4) , Validators.pattern('[0-9 ]*')]],
      email: ['', [Validators.required, Validators.email]],
      login: ['', [Validators.required, Validators.pattern('[a-zA-Z - 0-9 ]*')]],
      confirmPassword: ['', [Validators.required]],
      privatephone: ['', [Validators.required,Validators.pattern('[0-9 - + .]*')]],
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

    //put the array string on the canvas
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
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
    ctx.font = "34px Arial";
    ctx.lineWidth = 1.5;
    ctx.fillStyle = '#3F3F3F';
    ctx.fillText(this.captchaGenerated, 30, 33);
    ctx.textAlign = 'center';
    console.log('test generemimage');

  }
  clearCanvas(a) {
    //Create a canvas and link to the canvashtml tag
    const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    // mais à jour la taille du canvas pour rafrechir le captcha
    canvas.width += a;
  }
  //Refresh button fonction - Refresh le canvas HTML 
  onRefresh() {
    this.clearCanvas(0);
    this.generateCaptchaImage();
    console.log(this.captchaGenerated);
    console.log(this.registerForm.value);

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
      console.log('true');
    } else {
      console.log('false');
      return;
    }
    // ----------------------------/Captcha-----------------------------------

    if (this.registerForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.registerForm.invalid) {
      return;
    }

    this.user.login = this.registerForm.value.login;
    this.user.password = this.registerForm.value.password;
    this.loading = true;
    console.log(this.registerForm.value);
    console.log(this.user);
    

    this._userService.addCustomer(this.registerForm.value)
      .subscribe(() => {
        this.authenticationService.login(this.user)
          //.pipe(first())
          .subscribe(
            () => {
              this.router.navigate([this.returnUrl]);
            }
          );
        this.router.navigate([this.returnUrl]);
        //this.router.navigate(['home']);
      });

  }
}
