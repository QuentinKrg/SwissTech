import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  // --------------------------------Captcha---------------------------------------------------
  userCaptcha: String;
  captchaIsValid = false;
  captchaGenerated: string;
  // --------------------------------/Captcha---------------------------------------------------
  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      privatephone: ['', Validators.required],
      prophone: ['', Validators.required],
      userEnteredCaptcha:['',Validators.required]
    });
    this.generateCaptchaImage();
     this.userCaptcha = this.registerForm.value.userEnteredCaptcha;
    console.log(this.captchaGenerated);
    console.log(this.userCaptcha);
  }
  get f() { return this.registerForm.controls; }
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
    this.captchaGenerated = this.generateText(6);//genereun string aléatoire avec n caractères
    const canvas = <HTMLCanvasElement>document.getElementById('myCanvas');//Create a canvas and link to the canvashtml tag
    const ctx = canvas.getContext('2d');

 
  //put the array string on the canvas
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
   for (var j = 1; j < 70; j++) {
      ctx.save();
      ctx.lineWidth = getRandomInt(2,15);
      ctx.strokeStyle = 'rgb(' + getRandomInt(133,211) + ',' +
                         getRandomInt(133,211) + ','+getRandomInt(133,211)+')';
      ctx.strokeRect(getRandomInt(-5,200), 1, getRandomInt(20,60), getRandomInt(35,70))
      ctx.restore();
    }
    ctx.globalCompositeOperation = "source-atop";//Définit quel contexte va apparaître en tout premier sur le canvas
    
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
    if(this.isValid(this.registerForm.value.userEnteredCaptcha)){
      console.log('true');
    }else{console.log('false');
    return;
    }
    // ----------------------------/Captcha-----------------------------------
     
 
     // Stop si le formulaire n'est pas correctement rempli
     if (this.registerForm.invalid) {
       return;
     }
     
     this.loading = true;
 
   }
}
