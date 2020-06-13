import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ProductService } from 'src/app/services/product.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  //Icones
  faCartPlus = faCartPlus;
  constructor(
    private _productService: ProductService,
    private _dataService: DataService,
    private _router: Router
  ) { }
  quantity: number;
  @Input() productDetails: any;
  @Input() isCartItem: Boolean;

  ngOnInit() {
    this.quantity = 1;
  }

  onAddProductToCart() {
    if(this.productDetails != null) {
      const tmpProduct = new ShoppingCart();
      tmpProduct.id_Product = this.productDetails.id_Product;
      tmpProduct.Quantity = this.quantity;

      let cart: ShoppingCart[] = JSON.parse(localStorage.getItem('Cart'));
      
      
      if(cart == null) {
        cart=[];
        cart.push(tmpProduct);
      } else {
        let currentProduct = cart.filter(a=> a.id_Product == tmpProduct.id_Product);
        if(currentProduct.length > 0) {
          currentProduct.filter(a => {
            a.Quantity = a.Quantity + 1;
          });
        } else {
          cart.push(tmpProduct);
        }
      }

      this._dataService.updateCartItemCount(0);
      this._dataService.updateCartItemCount(this._dataService.getItemInACart(cart));
      this._dataService.updateShoppingCart(cart);
      localStorage.setItem('Cart', JSON.stringify(cart));
    }
  }

}
