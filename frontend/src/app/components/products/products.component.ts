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

    // filter la liste de produits avec les paramètres ci-dessus  
    this.filterAllProducts(this.allProducts , this.urlParams);   
  }

  // Récupération des produits actifs
  getAllProducts() {
    this._productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.allProducts = data.filter(product => product.isActive == true);
        this.filterValue = this.allProducts;   
      }
    );
  }

  // Filter la liste des articles
  filterAllProducts(productsList: Product[], params: HttpParams) {        
    // Si il y a un ou plusieurs paramètres
    if(params.keys().length > 0 ) {     
      params.keys().forEach(key => {
          switch (key) {
            case "q":
              this.allProducts = productsList.filter(p => p.ManufacturerName && p.ProductDescription && p.ProductName == params.get(key));
              console.log("w");
              break;
              
              
            case "cat":
              this.allProducts = productsList.filter(p => p.Categories.find(
                cat => cat.id === Number(params.get(key))                
              ));   
              console.log("1");          

              break;
          }
      });
    }   
    this.isLoaded = true;    
  }

}
