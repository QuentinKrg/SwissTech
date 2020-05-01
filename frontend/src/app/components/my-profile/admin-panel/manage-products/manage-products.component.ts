import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { AlertService } from 'src/app/services/alert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/CustomValidators';
import { Manufacturer } from 'src/app/models/Manufacturer';

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
    private _commentsService: CommentsService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder
  ) { }
  // Filtres
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
  filterText: string = "";

  // Ajout d'un article
  allCategories: Categories[] = [];
  addProductGroup: FormGroup;
  fileToUpload: File = null;
  allManufacturer: Manufacturer[] = [];

  // Commentaires
  selectedProduct: Product = new Product;
  productComments: Comments[] = [];

  ngOnInit() {
    this.addProductGroup = this._formBuilder.group({
      ProductName: ['', Validators.required],
      ProductColor: ['-1', Validators.required],
      ProductSize: ['', Validators.required],
      ProductCategory: ['-1', Validators.required],
      ProductBrand: ['-1', Validators.required],
      ProductPrice: ['', Validators.required],
      ProductImage: ['', Validators.required],
      ProductDescription: ['', Validators.required],

     });
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

  onChangeCommentStatus(comment: Comments) {
    if(comment.isActive == true) {
      comment.isActive = false;
    } else {
      comment.isActive = true;
    }

    this._commentsService.updateCommentStatus(comment).subscribe(() => {
      
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

  clearAllFilters() {
    this.allProducts = this.filterValue;
    this.selectedMainCategory = -1;
    this.allSubCategories = [];
    this.selectedSubCategory = -1;
    this.allSubSubCategories = [];
    this.selectedSubSubCategory = -1;
    this.textToFilterWith = "";
    this.selectedStatus = -1;
    this.filterText = '';
  }

  updateCategory() {
    if(this.addProductGroup.value.ProductCategory != -1) {
      this._categoriesService.getAllCategoriesWithThisTopCategory(this.addProductGroup.value.ProductCategory).subscribe(
        (data: Categories[]) => {
          if(data != null) {
            let previousCat: Categories;
            previousCat = this.allCategories.find(cat => cat.id == this.addProductGroup.value.ProductCategory);
            this.allCategories = data;
            this.allCategories.push(previousCat);
          };
        }
      );
    };
    
  }

  clearCategory() {
    this.allCategories = this.allMainCategories;
    this.addProductGroup.value.ProductCategory = -1;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);   
  }

  onSubmitAdd() {
    const formData = new FormData();
    formData.append('image', this.fileToUpload);
    
    this._productService.uploadProductImage(formData).subscribe(() => {

      let productToAdd: Product = new Product;
      productToAdd.ProductName = this.addProductGroup.value.ProductName;
      productToAdd.ProductUnitPrice = this.addProductGroup.value.ProductPrice;
      productToAdd.ProductDescription = this.addProductGroup.value.ProductDescription;
      productToAdd.ProductColor = this.addProductGroup.value.ProductColor;
      productToAdd.ImagePath = this.fileToUpload.name;
      productToAdd.ManufacturerId = this.addProductGroup.value.ProductBrand;
      productToAdd.ProductSize = this.addProductGroup.value.ProductSize;
      productToAdd.CategoryId = this.addProductGroup.value.ProductCategory;

      this._productService.addProduct(productToAdd).subscribe(
        () => {
          console.log("ok");
        },
        (error) => {

        }
      );
    });
    
  }

  openModalAddProduct(targetModal) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      scrollable: true
    });
    this.allCategories = this.allMainCategories;
    this._productService.getAllManufacturer().subscribe( (data: Manufacturer[]) => {
      this.allManufacturer = data;
    });

    this.addProductGroup.value.ProductCategory = -1;
  }

  closeModalAddProduct(targetModal) {
    this._modalService.dismissAll(targetModal);
    this.addProductGroup.reset();
    this.ngOnInit();
  }

  openModalComments(targetModal, product) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      scrollable: true
    });
    this.selectedProduct = product;
    this._commentsService.getAllProductsComments(this.selectedProduct.id_Product).subscribe(data => { this.productComments = data});

  }

}
