import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: ShoppingCart[];
  total: number = 0;
  productsInTheCart: Product[] = new Array();

  constructor(private _dataService: DataService,
              private _productService: ProductService) { }

  ngOnInit() {
    this._dataService.cart.subscribe(a => this.cart = a);
    this.getCartProductItem(this.cart);
    this.getTotal();
  }

  getCartProductItem(shoppingCart: ShoppingCart[]) {
    shoppingCart.forEach((productInCart,index) => {
      this._productService.getProductById(productInCart.ProductId).subscribe((data: Product) => {
        
      });
    });
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
    this.total = 0;
    console.log(this.productsInTheCart);
    
    this.productsInTheCart.forEach(productElem => {

      
    });
    
  }

}
