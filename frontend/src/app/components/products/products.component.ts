import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ProductListComponent } from '../home/product-list/product-list.component';
import { Order } from 'src/app/models/order';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _http: HttpClient,
              private _route: ActivatedRoute,
              private _router: Router,
              private _productService: ProductService,
              private _categoriesService: CategoriesService) { }

  urlParams = new HttpParams();
  allProducts: Product[] = [];
  filterValue: Array<any> = [];
  isLoaded: boolean = false;
  selectedOptionOrder: string = "bestseller";
  allSubCat: Categories[];

  
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
        // Récupération des sous-catégories
        this._categoriesService.getAllCategoriesWithThisTopCategory(params['cat']).subscribe(data => this.allSubCat = data);
      } else {
        // Si aucune catégorie en paramètre -> récupéreration des catégories principales
        this._categoriesService.getAllMainGategories().subscribe(data => this.allSubCat = data);
      }  
      // Filtrer les article. ob = order by
      if(params['ob'] != null) {
        this.urlParams = this.urlParams.set('ob',params['ob']);
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
      this.filterByCat(Number(this.urlParams.get('cat')));
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
    if(params.has('ob')) {
      this.sortBy(params.get('ob'));
      this.selectedOptionOrder = params.get('ob');
    } 

    this.isLoaded = true;    
  }

  // Filtrer par catégorie
  filterByCat(id: number) {
    this.allProducts = this.allProducts.filter(p => p.Categories.find(cat => cat.id == id));

    // Modifier le paramètre dans l'URL
    this._router.navigate([],
      {
        queryParams: {cat: id},
        queryParamsHandling: "merge"
      }
    );
  }

  // Méthode pour ordonné les articles
  sortBy(order: string) {
    // Modifier le paramètre dans l'URL
    this._router.navigate([],
      {
        queryParams: {ob: order},
        queryParamsHandling: "merge"
      }
    );

    // Ordrer par prix croissant
    if(order == "priceasc") {
      this.allProducts = this.allProducts.sort((a,b) => a.ProductUnitPrice-b.ProductUnitPrice);
    }

    // Ordrer par prix décroissant
    if (order == "pricedesc") {
      this.allProducts = this.allProducts.sort((a,b) => b.ProductUnitPrice-a.ProductUnitPrice);
    }

    // Ordrer par nom alphabétique
    if (order == "nameasc") {
      this.allProducts = this.allProducts.sort((a,b) => a.ProductName.toLocaleLowerCase() > b.ProductName.toLocaleLowerCase() ? 1 : -1);
    }

    // Ordrer par nom alphabétique inversé
    if (order == "namedesc") {
      this.allProducts = this.allProducts.sort((a,b) => a.ProductName.toLocaleLowerCase() < b.ProductName.toLocaleLowerCase() ? 1 : -1);
    }

    // Ordrer par meilleur vente
    if (order == "bestseller") {
      this.allProducts = this.filterValue;
    }
  }

}
