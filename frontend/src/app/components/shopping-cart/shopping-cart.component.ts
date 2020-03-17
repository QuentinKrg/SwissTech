import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { async } from '@angular/core/testing';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: ShoppingCart[];
  total: number = 0;
  productsInTheCart: Product[];

  constructor(private _dataService: DataService,
              private _productService: ProductService) { 
                
              }

  async ngOnInit() {
    this._dataService.cart.subscribe(a => this.cart = a);

    this.productsInTheCart = await this.getCartProductItem(this.cart);
    
    this.getTotal();                    
  }


  async getCartProductItem(shoppingCart: ShoppingCart[]) {
    let tmpProduct: Product[] = [];
    for (let i = 0; i < this.cart.length; i++) {
      let product: Product;
      product =  await this._productService.getProductById(this.cart[i].ProductId).toPromise();
      tmpProduct.push(product);
    }
    
    return this.productsInTheCart = tmpProduct;
  }



  onUpdateQuantity(type, productId) {
    if(type == 1) {
      this.cart.forEach((element, index) => {
        if(element.ProductId == productId){ this.cart[index].Quantity = element.Quantity + 1;}
      });
    } else {
      this.cart.forEach((element, index) => {
        if(element.ProductId == productId){ this.cart[index].Quantity = element.Quantity - 1;}
      });
    }
    this.getTotal();
  }



  getTotal()
  {
    
    this.productsInTheCart.forEach(element => {
      console.log(element);
      
    });
    
    
    

    
    
    this.total = 0;    
    
    
  }

}
