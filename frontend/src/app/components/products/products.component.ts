import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ProductListComponent } from '../home/product-list/product-list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _http: HttpClient,
              private _route: ActivatedRoute,
              private _productService: ProductService) { }

  urlParams = new HttpParams();
  allProducts: Product[] = [];
  filterValue: Array<any> = [];
  isLoaded: boolean = false;
  
  ngOnInit() {
    // Récupération des paramètres de recherches
    this._route.queryParams.subscribe(params =>  {
      // Recherche par texte
      if(params['q'] != null) {       
        this.urlParams =   this.urlParams.set('q',params['q']);
      }
      // Recherche par catégorie
      if(params['cat'] != null) {
        this.urlParams = this.urlParams.set('cat',params['cat']);
      }    
    });

    // Récupérer l'ensemble des produits actifs en bdd
    this.getAllProducts();

     
  }

  // Récupération des produits actifs
  getAllProducts() {
    this._productService.getAllProducts().subscribe(
      (data: Product[]) => {   
        
        this.allProducts = data.filter(p => p.isActive == true);
        this.filterValue = this.allProducts;   

        // filter la liste de produits avec les paramètres ci-dessus  
        this.filterAllProducts(this.allProducts , this.urlParams);  
      }
    );
  }

  // Filter la liste des articles
  filterAllProducts(productsList: Product[], params: HttpParams) {        
    if(params.has('cat')) {
      this.allProducts = productsList.filter(p => p.Categories.find(cat => cat.id == Number(this.urlParams.get('cat'))));
    }
    if(params.has('q')) {
      let tmpSearchValue: string = params.get('q').toLowerCase();
      this.allProducts = productsList.filter(
          p => p.ProductName.toLowerCase().includes(tmpSearchValue)
          || p.ProductDescription.toLowerCase().includes(tmpSearchValue)
          || p.ManufacturerName.toLowerCase().includes(tmpSearchValue)
          || p.ProductColor.toLowerCase().includes(tmpSearchValue)
          || p.CategoryName.toLowerCase().includes(tmpSearchValue)
        );      
    }
    
    this.isLoaded = true;    
  }

  sortBy(field: string, order: string) {
    if(order == "ASC") {
      this.allProducts = this.filterValue.sort((a,b) => a[field] < b[field] ? 1 : -1 );     
      console.log(this.allProducts);
      
      
      
      
    } else if (order == "DESC") {
    }
  }

}
