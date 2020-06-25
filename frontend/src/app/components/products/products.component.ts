import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart, Params } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ProductListComponent } from '../home/product-list/product-list.component';
import { Order } from 'src/app/models/order';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { Color } from 'src/app/models/Color';
import { FormControl } from '@angular/forms';

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
              private _categoriesService: CategoriesService) {
                _router.events.subscribe((val ) => {                 
                  if(val instanceof NavigationEnd && this.asBeenInit) {
                    this.getParams();
                    this.allProducts = this.filterValue;
                    this.filterAllProducts(this.allProducts, this.urlParams);    
                  }
                });
              }

  
  urlParams = new HttpParams();
  allProducts: Product[] = [];
  filterValue: Array<any> = [];
  isLoaded: boolean = false;
  selectedOptionOrder: string = "bestseller";
  
  asBeenInit: boolean = false;
  queryTextFilter: string = "";

  //-- Filtres --//
  // Catégories
  selectedCategory: Categories = null;
  allSubCat: Categories[];
  previousCat: Categories = null;
  // Marques
  allManufacturers: Manufacturer[] = [];
  selectedBrand: number = -1;
  selectedBrandInfo: Manufacturer = null;

  // Couleurs
  allColors: Color[] = [];
  toppings = new FormControl();
  selectedColor: number = -1;

  // Prix
  maxPrice: number = 100000;
  minPrice: number = 0;
  maxPriceToNotChange: number = 100000;
  minPriceToNotChange: number = 0;

  ngOnInit() {    
    window.scroll(0,0);
    // Récupération des paramètres dans l'URL
    this.getParams();
    // Récupérer l'ensemble des produits actifs en bdd
    this.getAllProducts();
    // Récupération de toutes les données pour les filtres
    this.getAllManufacturersAndColors();
    // Boolean qui permet de ne pas appeler les fonctions 2x (entre le ngOnInit et le constructeur)
    this.asBeenInit = true;    
  }

  // Récupération des paramètres de recherches
  getParams() {
    this._route.queryParams.subscribe(params =>  {   
      this.urlParams = new HttpParams();
         
      // Recherche par texte
      if(params['q'] != null) {       
        this.urlParams =  this.urlParams.set('q',params['q']);
      }
      // Recherche par catégorie
      if(params['cat'] != null) {
        this.urlParams = this.urlParams.set('cat',params['cat']);
        // Récupération de la catégorie du dessus (pour revenir)
        this._categoriesService.getPreviousCategory(params['cat']).subscribe(data => {this.previousCat = data; });
        // Récupération des sous-catégories
        this._categoriesService.getAllCategoriesWithThisTopCategory(params['cat']).subscribe(data => this.allSubCat = data);
        // Récupérer les informations de la catégories sélectionnée
        this._categoriesService.getCategoryById(params['cat']).subscribe(data => {this.selectedCategory = data});        
      } else {
        // Si aucune catégorie en paramètre -> récupéreration des catégories principales
        this._categoriesService.getAllMainGategories().subscribe(data => this.allSubCat = data);
      }  
      // Filtrer les article par ob = order by
      if(params['ob'] != null) {
        this.urlParams = this.urlParams.set('ob',params['ob']);
      } 

      // Filtrer les articles par couleur
      if(params['color'] != null) {
        this.urlParams = this.urlParams.set('color',params['color']);
      } 

      // Filtrer les articles par marque
      if(params['brand'] != null) {
        this.urlParams = this.urlParams.set('brand',params['brand']);
      } 

      // Filtrer les articles par prix
      if(params['price'] != null) {
        this.urlParams = this.urlParams.set('price', params['price']);
      }
    });    
  }

  // Récupération des produits actifs
  getAllProducts() {
    this._productService.getAllProducts().subscribe(
      (data: Product[]) => {   
        
        // Filtrer les produits qui sont "actifs"
        this.allProducts = data.filter(p => p.isActive == true);
        this.filterValue = this.allProducts;   

        // filter la liste de produits avec les paramètres ci-dessus  
        this.filterAllProducts(this.allProducts, this.urlParams);  
      }
    );
  }

  // Filter la liste des articles
  filterAllProducts(productsList: Product[], params: HttpParams) {     
    //reset
    this.selectedBrandInfo = null;
    // Filtrer avec le text
    if(params.has('q')) {      
      let tmpSearchValue: string = params.get('q').toLowerCase();
      productsList = productsList.filter(
          p => p.ProductName.toLowerCase().includes(tmpSearchValue)
          || p.ProductDescription.toLowerCase().includes(tmpSearchValue)
          || p.ManufacturerName.toLowerCase().includes(tmpSearchValue)
          || p.ProductColor.toLowerCase().includes(tmpSearchValue)
          || p.CategoryName.toLowerCase().includes(tmpSearchValue)
        );  
        this.queryTextFilter = params.get('q');
    }

    // Filtrer avec les catégories
    if(params.has('cat')) {
      productsList = productsList.filter(p => p.Categories.find(cat => cat.id == Number(this.urlParams.get('cat'))));  
    }

    // Filtrer par marque
    if(params.has('brand')) {
      productsList = productsList.filter(p => p.ManufacturerId == Number(this.urlParams.get('brand')));
      
      this.selectedBrand = Number(this.urlParams.get('brand'));
    } 
    
    // Si il n'y a que la marque qui est filtrée
    if(params.getAll.length == 1 && params.has('brand')) {
      this.selectedBrandInfo = this.allManufacturers.find(man => man.id_Manufacturer == Number(this.urlParams.get('brand')));
    }
    

    // Filtrer par couleur
    if(params.has('color')) {
      productsList = productsList.filter(p => Number(p.ProductColor) == Number(this.urlParams.get('color')));
      this.selectedColor = Number(this.urlParams.get('color'));
    }
  
    this.getMaxAndMin(productsList);
    // Filtrer par fourchette de prix
    if(params.has('price')) {   
      // Récupération et stockage des valeurs min et max
      let toArray = params.get('price').split("-");
      this.minPrice = Number(toArray[0]);
      this.maxPrice = Number(toArray[1]);  
      if(this.minPrice >= this.minPriceToNotChange && this.maxPrice <= this.maxPriceToNotChange && this.minPrice <= this.maxPrice) {
        // Filrer par prix
        productsList = productsList.filter(p => p.ProductUnitPrice >= this.minPrice && p.ProductUnitPrice <= this.maxPrice);
      }else {
        this.urlParams.delete('price');
        // Modifier le paramètre dans l'URL
        this._router.navigate([],
          {
            queryParams: {price: null},
            queryParamsHandling: "merge"
          }
        );
      }       
      
     
    }

    // Filtrer par "Order By" dans l'ordre voulu
    if(params.has('ob')) {      
      this.sortBy(params.get('ob'), productsList);
      this.selectedOptionOrder = params.get('ob');           
    }

    // Assigner les articles filtré + Afficher le contenu de la page 
    this.allProducts = productsList;
    this.isLoaded = true;    
  }

  // Filtrer par catégorie
  filterByCat(id: number) {
    // Modification de la variable contentant les paramètres
    this.urlParams = this.urlParams.set('cat',id.toString());

    // Récupération du prix max et min de la liste de produit
    this.getMaxAndMin(this.filterValue);

    // Modifier le paramètre dans l'URL
    this._router.navigate([],
      {
        queryParams: {cat: id},
        queryParamsHandling: "merge"
      }
    );
  }

  // Filtrer par prix
  filterByPriceRange() {
    if(this.minPrice >= this.minPriceToNotChange && this.maxPrice <= this.maxPriceToNotChange && this.minPrice <= this.maxPrice) {
      // Modifier le paramètre dans l'URL
      this._router.navigate([],
        {
          queryParams: {price: this.minPrice+"-"+this.maxPrice},
          queryParamsHandling: "merge"
        }
      );
    }

  }

  // Filtrer par marques
  filterByBrand() {    
    // Modifier le paramètre dans l'URL
    this._router.navigate([],
      {
        queryParams: {brand: this.selectedBrand},
        queryParamsHandling: "merge"
      }
    );
  }

  // Filtrer par couleurs
  filterByColor() {
    // Modifier le paramètre dans l'URL
    this._router.navigate([],
      {
        queryParams: {color: this.selectedColor},
        queryParamsHandling: "merge"
      }
    );
  }

  // Méthode pour ordonné les articles
  sortBy(order: string, list: Product[]) {
    // Ordrer par prix croissant
    if(order == "priceasc") {     
      this.allProducts = list.sort((a,b) => a.ProductUnitPrice-b.ProductUnitPrice);
    }

    // Ordrer par prix décroissant
    if (order == "pricedesc") {
      this.allProducts = list.sort((a,b) => b.ProductUnitPrice-a.ProductUnitPrice);
    }

    // Ordrer par nom alphabétique
    if (order == "nameasc") {
      this.allProducts = list.sort((a,b) => a.ProductName.toLocaleLowerCase() > b.ProductName.toLocaleLowerCase() ? 1 : -1);
    }

    // Ordrer par nom alphabétique inversé
    if (order == "namedesc") {
      this.allProducts = list.sort((a,b) => a.ProductName.toLocaleLowerCase() < b.ProductName.toLocaleLowerCase() ? 1 : -1);
    }

    // Ordrer par meilleur vente
    if (order == "bestseller") {
      this.allProducts = list.sort();
    }
  
    // Modifier le paramètre dans l'URL
    this._router.navigate([],
      {
        queryParams: {ob: order},
        queryParamsHandling: "merge"
      }
    );
  }

  // Récupération des données Marques et couleurs pour les filtres
  getAllManufacturersAndColors() {
    // Récupération des marques
    this._productService.getAllManufacturer().subscribe((brands) => {this.allManufacturers = brands});

    // Récupérations des couleurs
    this._productService.GetAllColors().subscribe((colors) => {this.allColors = colors});
  }

  // Récupérer le prix min et max des articles filtrés
  getMaxAndMin(list: Product[]) {
    if(list.length > 0) {
      // Création d'un tableau avec le prix de tous les articles
      let allPrice: number[] = list.map(product => product.ProductUnitPrice);   

      // Récupération du prix min
      this.minPriceToNotChange = allPrice.reduce((a,b) => Math.min(a,b));
      console.log(this.minPriceToNotChange);
      
      this.minPrice = this.minPriceToNotChange;

      // Récupération du prix max
      this.maxPriceToNotChange = allPrice.reduce((a,b) => Math.max(b,a));
      console.log(this.maxPriceToNotChange);
      
      this.maxPrice = this.maxPriceToNotChange;  
      
    }
  }

  // Revenir sur la catégorie précédente
  goToPreviousCat(id: number) {
        // Modifier le paramètre dans l'URL
        this._router.navigate([],
          {
            queryParams: {cat: id},
            queryParamsHandling: "merge"
          }
        );
  }


}
