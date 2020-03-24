import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  product: Product;
  productId: number;

  constructor(private _productService: ProductService,
              private _route: ActivatedRoute) { 
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
    
  }

  

}
