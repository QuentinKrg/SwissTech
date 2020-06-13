import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faPlusCircle, faMinusCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
//Icones
faPlusCircle =faPlusCircle;
faMinusCircle=faMinusCircle;
faTimesCircle=faTimesCircle;
  cart: ShoppingCart[];
  total: number = 0;
  productsInTheCart: Product[] = [];
  imageUrl: string;

  constructor(private _dataService: DataService,
              private _productService: ProductService,
              private _router: Router) {
                this.imageUrl = environment.imageDirectory;
              }

   ngOnInit() {
    // Récupérer les éléments présents dans le panier dans "cart" du service "dataService"
    this._dataService.cart.subscribe(a => this.cart = a);
    
    // Récupérer les informations des articles grâce au panier
    if(this.cart.length > 0) {
      this.getCartProductItem(this.cart);
    }

  }

  ngAfterViewInit(){
    // Attendre avant d'appeler le total du panier
    if(this.cart.length > 0) {
      setTimeout( ()=>{
        this.getTotal();
        }, 100)
    }
    
    
  }

  // Récupération et stockage des produits en base données
  getCartProductItem(shoppingCart: ShoppingCart[]) {
    shoppingCart.forEach(async cartElement => {
      this.productsInTheCart.push(await this._productService.getProductById(cartElement.id_Product).toPromise());
      localStorage.setItem('ProductsInTheCart', JSON.stringify(this.productsInTheCart));
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

  // Mise à jour d'une quantité d'un produit
  onUpdateQuantity(type, productId) {
    // Si le "type" est égale à 1 : ajout de +1 au produit sélectionné
    if(type == 1) {
      this.cart.forEach((element, index) => {
        if(element.id_Product == productId)
        {
          if(this.cart[index].Quantity < 99) {
            this.cart[index].Quantity = element.Quantity + 1;
          }
        }
      });
    } else {
      // Sinon on enlève une quantité au produit sélectionné
      this.cart.forEach((element, index) => {
        if(element.id_Product == productId)
        {
          if(this.cart[index].Quantity > 1) {
            this.cart[index].Quantity = element.Quantity - 1;
          }
        }
      });
    }

    // Mise à jour des infromations du panier
    this._dataService.updateCartItemCount(0);
    this._dataService.updateCartItemCount(this._dataService.getItemInACart(this.cart));
    this._dataService.updateShoppingCart(this.cart);
    localStorage.setItem('Cart', JSON.stringify(this.cart));

    // Mise à jour du total du panier
    this.getTotal();
  }

  // Enlever un produit du panier
  onRemoveProduct(productId) {
    this.cart.forEach((element, index) => {
      if(element.id_Product === productId) {
        // Le cart = le cart moins le produit sélectionné
        this.cart[index].Quantity = 0;
        this.cart = this.cart.filter(e => e.Quantity != 0);
      }
    });

    // Mise à jour des infromations du panier
    this._dataService.updateCartItemCount(0);
    this._dataService.updateCartItemCount(this._dataService.getItemInACart(this.cart));
    this._dataService.updateShoppingCart(this.cart);
    localStorage.setItem('Cart', JSON.stringify(this.cart));

    // Mise à jour du total du panier
    this.getTotal();

    // Refresh du componenent actuel et redirection sur la page "cart"
    this._router.navigateByUrl('/ShoppingCartComponent', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/cart']);
    });
  }

  // Calculer la somme des produits dans le panier
  getTotal()
  {
    this.total = 0;
    // Récupération des détails des produits
    let allProducts: Product[] = JSON.parse(localStorage.getItem('ProductsInTheCart'));

    this.cart.forEach(cartElement => {
      allProducts.forEach(productElement => {
        if(cartElement.id_Product === productElement.id_Product)
        {
          this.total += cartElement.Quantity*productElement.ProductUnitPrice;
        // console.log(this.total);
        // console.log(productElement.ProductUnitPrice);
        }
      });
    });
  }

}
