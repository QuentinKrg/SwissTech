import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  imageUrl: string;

  constructor() { 
    this.imageUrl = environment.imageDirectory;
  }

  @Input('productData') product: Product;
  ngOnInit() {
  }

}
