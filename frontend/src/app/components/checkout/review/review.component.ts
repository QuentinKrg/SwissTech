import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  cart: ShoppingCart[];
  total: number = 0;
  productsInTheCart: Product[] = [];
  allProducts: Product[];
  imageUrl: string;
  
  constructor(private _dataService: DataService,
    private _productService: ProductService,
    private _router: Router) {
      this.imageUrl = environment.imageDirectory;
   }

  ngOnInit() {
    this.allProducts = JSON.parse(localStorage.getItem('ProductsInTheCart'));
    this._dataService.cart.subscribe(a => this.cart = a);
    if(this.allProducts == null || this.cart == null) {
      // Si le détails des produits est null ou si le panier est null = redirection
      this._router.navigate(['']);
    }
  }

  ngAfterViewInit(){
    // Attendre avant d'appeler le total du panier
    setTimeout( ()=>{
    this.getTotal();
    }, 100)
  }
  // Calculer la somme des produits dans le panier
  getTotal()
  {
    this.total = 0;

    this.cart.forEach(cartElement => {
      this.allProducts.forEach(productElement => {
        if(cartElement.id_Product === productElement.id_Product)
        {
          this.total += cartElement.Quantity*productElement.ProductUnitPrice;
        }
      });
    });
  }

  // Récupération d'une quantité de produit dans le panier avec un object product
  getQuantityOfProduct(product: Product) {
    let shoppingCart: ShoppingCart[];
    let cartValue: ShoppingCart;

    shoppingCart = this.cart.filter(a => a.id_Product === product.id_Product);

    shoppingCart.forEach(element => {
      cartValue = element;
    });

    return cartValue;
  }

}
