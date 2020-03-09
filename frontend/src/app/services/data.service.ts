import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _itemCount = new BehaviorSubject(0);
  count: Observable<number> = this._itemCount.asObservable();

  private _shoppingCart = new BehaviorSubject([]);
  cart = this._shoppingCart.asObservable();

  constructor() { 
    let isEmptyCart: boolean = localStorage.getItem('Cart') == null;
    
    this.updateCartItemCount(isEmptyCart ? 0 : this.getItemInACart(JSON.parse(localStorage.getItem('Cart'))));
    this.updateShoppingCart(isEmptyCart ? 0 : JSON.parse(localStorage.getItem('Cart')));
  }

  getItemInACart(shoppingCart: ShoppingCart[]) {
    let tmpTotal = 0;
    shoppingCart.forEach(product => {
      tmpTotal += product.Quantity;
    });
    return tmpTotal;
  }

  // Mise à jour du nombre d'articles présents dans le panier
  updateCartItemCount(count: number) {
      this._itemCount.next(count);
  }

  // Mise à jour des articles présents dans le panier
  updateShoppingCart(cartItems: ShoppingCart[]) {
    this._shoppingCart.next(cartItems);
  }
}
