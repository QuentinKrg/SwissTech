import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  constructor(
    private _categoriesService: CategoriesService,
    private _productService: ProductService,
    private _alertService: AlertService,
    private _modalService: NgbModal
  ) { }

  allMainCategories: Categories[] = [];
  selectedMainCategory: number = -1;

  allSubCategories: Categories[] = [];
  selectedSubCategory: number = -1;

  allSubSubCategories: Categories[] = [];
  selectedSubSubCategory: number = -1;

  selectedStatus: number = -1;

  allProducts: Product[];
  filterValue: Array<any> = [];

  textToFilterWith : string = "";

  ngOnInit() {
    this._categoriesService.getAllMainGategories().subscribe((data) => {this.allMainCategories = data});
    this.getAllProducts();
    
    
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.allProducts = data;
        this.filterValue = this.allProducts;
      }
    );
  }

  onChangeProductStatus(product: Product) {
    if(product.isActive == true) {
      product.isActive = false;
    } else {
      product.isActive = true;
    }

    this._productService.updateProductStatus(product).subscribe(() => {
      
    },  
    //en cas d'erreur
    (error) => {
      console.log(error);
      return;
    });
  }

  filteredByStatus() {
    this.allProducts = this.filterValue;
    if(this.selectedStatus == -1) {
      this.allProducts = this.filterValue;
    } else if (this.selectedStatus == 0) {
      this.allProducts = this.allProducts.filter(p => p.isActive == false);
    } else if (this.selectedStatus == 1) {
      this.allProducts = this.allProducts.filter(p => p.isActive == true);
    }

    this.filteredByCategories();

  }

  filteredByText(initial: string) {
    this.allProducts = this.filterValue;
    this.filteredByStatus();
    this.filteredByCategories();

    this.allProducts = this.allProducts.filter(i => i.ProductName.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    this.textToFilterWith = initial.toLocaleLowerCase();
  }

  filteredByCategories() {
    this.allProducts = this.filterValue;

    // Filter avec le texte
    this.allProducts = this.allProducts.filter(i => i.ProductName.toLowerCase().indexOf(this.textToFilterWith) !== -1);

    
    // Si aucune catégorie principale n'est choisie
    if(this.selectedMainCategory == -1) {
      this.allSubCategories = [];
      this.allSubSubCategories = [];
      this.selectedSubCategory = -1;
      this.selectedSubSubCategory = -1;
      this.allProducts = this.filterValue;
    }

    
    // Si une catégorie principale est choisie
    if(this.selectedMainCategory != -1 )
    {
      // Filtrages par main catégories
      this.allProducts = this.allProducts.filter(p => p.Categories.find(cat => cat.id === this.selectedMainCategory));

      // Récupération des sous-catégories
      this.allSubCategories = [];
      this.allSubSubCategories = [];
      this._categoriesService.getAllCategoriesWithThisTopCategory(this.selectedMainCategory).subscribe(
        (data: Categories[]) => {this.allSubCategories = data}
      );
    }

    // Si une sous-catégories est choisie
    if(this.selectedMainCategory != -1 && this.selectedSubCategory != -1) 
    {
      // Filtrage par sous catégories
      this.allProducts = this.allProducts.filter(p => p.Categories.find(cat => cat.id === this.selectedSubCategory));

      // Récupération des sous-sous catégories
      this.allSubSubCategories = [];
      this._categoriesService.getAllCategoriesWithThisTopCategory(this.selectedSubCategory).subscribe(
        (data: Categories[]) => {this.allSubSubCategories = data;}
      );
    }


    if(this.selectedMainCategory != -1 && this.selectedSubCategory == -1) 
    {
      this.allSubSubCategories = [];
      this.selectedSubSubCategory = -1;
    }

    // Si une sous-sous-catégorie est  choisie
    if(this.selectedMainCategory != -1 && this.selectedSubCategory != -1 && this.selectedSubSubCategory != -1)
    {
      // Filtrage par sous-sous catégories
      this.allProducts = this.allProducts.filter(p => p.Categories.find(cat => cat.id === this.selectedSubSubCategory));
    }

    // Refiltrage par texte
    this.allProducts = this.allProducts.filter(i => i.ProductName.toLowerCase().indexOf(this.textToFilterWith) !== -1);

    // refiltrage par status 
    if (this.selectedStatus == 0) {
      this.allProducts = this.allProducts.filter(p => p.isActive == false);
    } else if (this.selectedStatus == 1) {
      this.allProducts = this.allProducts.filter(p => p.isActive == true);
    }

  }

}
