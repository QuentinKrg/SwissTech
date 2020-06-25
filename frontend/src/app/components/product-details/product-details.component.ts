import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  //Icones
  faSyncAlt =faSyncAlt;

  //VAriables
  currentUser: User;
  product: Product;
  productId: number;
  productsComments: Comments[] = [];
  addCommentForm: FormGroup;
  imageUrl: any;

  showForm: boolean = false;
  // --------------------------------Captcha---------------------------------------------------
  userCaptcha: String;
  captchaIsValid = false;
  captchaGenerated: string;
  submitted = false;
  // --------------------------------/Captcha---------------------------------------------------
  constructor(private _formBuilder: FormBuilder,
              private _productService: ProductService,
              private _route: ActivatedRoute,
              private _commentsService: CommentsService,
              private _authenticationService: AuthenticationService) { 
                this._authenticationService.currentUser.subscribe(x => this.currentUser = x);
                this.product = new Product();
                this.imageUrl = environment.imageDirectory;
              }

  ngOnInit() {   
    window.scroll(0,0);
    // Récupérer l'id passé dans l'URL
    this._route.params.subscribe(params => {
      this.productId = params['id'];
    });

    // Récupération des détails de l'article 
    this._productService.getProductDetailsById(this.productId)
    .subscribe(data => {
      this.product = data[0];
      if(this.product != null) {
        // Retourner les catégories dans le bon sens
        this.product.Categories = this.product.Categories.reverse();

        // Ne garder que les catégories qui ne sont pas null (si un article n'a que 1 ou 2 catégorie(s))
        this.product.Categories = this.product.Categories.filter(cat => cat.id != null);
      }

      
      
    });
    //Création d'un formulaire
    this.addCommentForm = this._formBuilder.group({
      commentText: ['', Validators.required],
      userEnteredCaptcha: ['', [Validators.required]]//CAPTCHA
    });

    // Récupérations des commentaires de l'article
    this._commentsService.getAllProductsComments(this.productId)
    .subscribe(comments => {
      this.productsComments = comments;
      //console.log(this.productsComments);
    });
    
    this.submitted = false;//CAPTCHA
    this.userCaptcha = this.addCommentForm.value.userEnteredCaptcha;//CAPTCHA
  }

  ngAfterViewInit(): void{
    this.generateCaptchaImage();//CAPTCHA
    this.onRefresh();
  }


// --------------------------------Captcha---------------------------------------------------
get f() { return this.addCommentForm.controls; }
  //fonction qui retourne un array de string, longeur selon paramètre
  generateText(length) {
    var result = '';
    var characters = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
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
      ctx.lineWidth = getRandomInt(3, 30);
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

  // Affichage du formulaire au complet
  onClickInput(e: any, show: boolean) {    
    if(show) {
      this.showForm = true;
    } else if(!show) {
      this.showForm = false;
    }
  }

  // Envoie du formulaire pour commentaire
  onSubmit() {
    this.submitted = true;
    // Stop si le formulaire n'est pas correctement rempli
    if(this.addCommentForm.invalid) {
      return;
    }
    // ------------------------Captcha---------------------------------------
    //Stop si le captcha saisit ne match pas avec celui qui a été généré au moment du submit
    if (this.isValid(this.addCommentForm.value.userEnteredCaptcha)) {
    } else {
      return;
    }
    // ----------------------------/Captcha-----------------------------------
    // Création d'un commentaire
    let tmpComment: Comments = new Comments;
    tmpComment.CommentValue = this.addCommentForm.value.commentText;  

    tmpComment.FK_Customer = this._authenticationService.currentUserValue.FK_Customer;
    tmpComment.FK_Product = this.productId;

    this._commentsService.addComment(tmpComment).subscribe(() => {
      this.ngOnInit();
      this.ngAfterViewInit();
    });
  }
}
