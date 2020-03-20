import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { async } from '@angular/core/testing';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { flatten } from '@angular/compiler';
import { element } from 'protractor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: ShoppingCart[];
  total: number = 0;
  productsInTheCart: Product[] = [];

  constructor(private _dataService: DataService,
              private _productService: ProductService,
              private _router: Router) { 
                
              }

   ngOnInit() {
    this._dataService.cart.subscribe(a => this.cart = a);

    this.getCartProductItem(this.cart);

    this.getTotal();                    
  }

  // Récupération et stockage des produits en base données
  getCartProductItem(shoppingCart: ShoppingCart[]) {
    shoppingCart.forEach(async cartElement => {
      this.productsInTheCart.push(await this._productService.getProductById(cartElement.ProductId).toPromise());
      localStorage.setItem('ProductsInTheCart', JSON.stringify(this.productsInTheCart));
      
    }); 
  }

  // Récupération d'une quantité de produit dans le panier
  getQuantityOfProduct(product: Product) {
    let shoppingCart: ShoppingCart[];
    let cartValue: ShoppingCart;
    shoppingCart = this.cart.filter(a => a.ProductId === product.id_Product);
    
    shoppingCart.forEach(element => {
      cartValue = element;
    });

    return cartValue;
  }

  // Mise à jour d'une quantité d'un produit
  onUpdateQuantity(type, productId) {
    if(type == 1) {
      this.cart.forEach((element, index) => {
        if(element.ProductId == productId)
        { 
          if(this.cart[index].Quantity < 99) {
            this.cart[index].Quantity = element.Quantity + 1;
          }
        }
      });
    } else {
      this.cart.forEach((element, index) => {
        if(element.ProductId == productId)
        { 
          if(this.cart[index].Quantity > 1) {
            this.cart[index].Quantity = element.Quantity - 1;
          }
        }
      });
    }
    this._dataService.updateCartItemCount(0);
    this._dataService.updateCartItemCount(this._dataService.getItemInACart(this.cart));
    this._dataService.updateShoppingCart(this.cart);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.getTotal();
  }

  // Enlever un produit du panier
  onRemoveProduct(productId) {
    this.cart.forEach((element, index) => {
      if(element.ProductId == productId) {
        this.cart[index].Quantity = 0;
        this.cart = this.cart.filter(e => e.Quantity != 0);       
      }
    });
    
    this._dataService.updateCartItemCount(0);
    this._dataService.updateCartItemCount(this._dataService.getItemInACart(this.cart));
    this._dataService.updateShoppingCart(this.cart);
    localStorage.setItem('Cart', JSON.stringify(this.cart));
    this.getTotal();
    this._router.navigateByUrl('/cart', { skipLocationChange: true }).then(() => {
      this._router.navigate(['cart']);
  }); 
  }

  // Calculer la somme des produits dans le panier
  getTotal()
  {
    this.total = 0;
    let allProducts: Product[] = JSON.parse(localStorage.getItem('ProductsInTheCart'));

    this.cart.forEach(cartElement => {
      allProducts.forEach(productElement => {
        if(cartElement.ProductId === productElement.id_Product) 
        {
          this.total += cartElement.Quantity*productElement.ProductUnitPrice;
        }
      });
    });
    
    
  }

}
