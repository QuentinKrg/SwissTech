import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: ShoppingCart[];
  total: number = 0;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.cart.subscribe(a => this.cart = a);
    this.getTotal();
  }

  getCartProductItem() {
    this.cart = JSON.parse(localStorage.getItem('Cart'));
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
    this.cart.forEach((element) => {
      this.total = this.total + ()
    })

  }

}
