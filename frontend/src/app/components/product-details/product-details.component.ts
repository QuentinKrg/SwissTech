import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  product: Product;
  productId: number;
  productsComments: Comments[] = [];
  addCommentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private _productService: ProductService,
              private _route: ActivatedRoute,
              private _commentsService: CommentsService,
              private _authenticationService: AuthenticationService,
              private _userService: UserService) { 
                this.product = new Product();
              }

  ngOnInit() {
    // Récupérer l'id passé dans l'URL
    this._route.params.subscribe(params => {
      this.productId = params['id'];
    });

    // Récupération des détails de l'article 
    this._productService.getProductDetailsById(this.productId)
    .subscribe(product => {
      this.product = product as Product;
      console.log(this.product);
      
    });

    this.addCommentForm = this.formBuilder.group({
      commentText: ['', Validators.required]
    });

    // Récupérations des commentaires de l'article
    this._commentsService.getAllProductsComments(this.productId)
    .subscribe(comments => {
      this.productsComments = comments;
      //console.log(this.productsComments);
    });
  }

  onSubmit() {
    // Stop si le formulaire n'est pas correctement rempli
    if(this.addCommentForm.invalid) {
      return;
    }

    // Création d'un commentaire
    let tmpComment: Comments = new Comments;
    tmpComment.CommentValue = this.addCommentForm.value.commentText;
    
    tmpComment.CommentDate = new Date();
    console.log(tmpComment.CommentDate);
    
    
    tmpComment.isActive = true;
    tmpComment.FK_Customer = this._authenticationService.currentUserValue.FK_Customer;
    tmpComment.FK_Product = this.productId;

    this._commentsService.addComment(tmpComment).subscribe(() => {
      this.ngOnInit();
    });

  }

  

}
