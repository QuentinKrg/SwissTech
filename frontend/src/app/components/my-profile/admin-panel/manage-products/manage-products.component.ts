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

  allProducts: Product[];
  filterValue: Array<any> = [];

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

  filteredByCategories() {
    if(this.selectedMainCategory != -1)
    {
      // Filtrages par main catégories

    }

    if(this.selectedMainCategory != -1 && this.selectedSubCategory == -1)
    {
      // Récupération des sous-catégories
      this._categoriesService.getAllCategoriesWithThisTopCategory(this.selectedMainCategory).subscribe(
        (data: Categories[]) => {this.allSubCategories = data}
      );
    }

    if(this.selectedMainCategory != -1 && this.selectedSubCategory != -1) 
    {
      // Filtrage par sous catégories
    }

    if(this.selectedMainCategory != -1 && this.selectedSubCategory != -1 && this.selectedSubSubCategory == -1)
    {
      // Récupération des sous-sous catégories
    }

    if(this.selectedMainCategory != -1 && this.selectedSubCategory != -1 && this.selectedSubSubCategory != -1) {
      // Filtrage par sous-sous catégories
    }
  }

}
