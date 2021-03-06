import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recommendationList: Product[];
  bestSellers: Product[];
  private _id: number;
  constructor(private _productService: ProductService,
              private _router: Router) { }

  ngOnInit() {
    window.scroll(0,0);
    this._productService.getRandoms(4)
      .subscribe((data: Product[]) =>{
        this.recommendationList = data;
    });
    this._productService.getRandoms(4)
      .subscribe((data: Product[]) =>{
        this.bestSellers = data;
    });

  }
}
