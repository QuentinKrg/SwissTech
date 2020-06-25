import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Categories } from 'src/app/models/categories';
import { Product } from 'src/app/models/product';
import { Comments } from 'src/app/models/comments';
import { CommentsService } from 'src/app/services/comments.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Manufacturer } from 'src/app/models/Manufacturer';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Color } from 'src/app/models/Color';
import { Customer } from 'src/app/models/customer';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {


  constructor(
    private _categoriesService: CategoriesService,
    private _productService: ProductService,
    private _commentsService: CommentsService,
    private _modalService: NgbModal,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService
  ) {
    this.imageUrl = environment.imageDirectory;
  }
  //icones
  faEllipsisV = faEllipsisV;

  //Pagination
  pageSize: number;
  itemsPerPage: number;
  //utilisateur actuel
  currentUsername = this._authenticationService.currentUserValue.login;

  //Lock
  isLocked = false;
  LockedBy: String;
  loading = false;
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

  textToFilterWith: string = "";
  filterText: string = "";

  // Preview d'un article
  selectedProductPreview: Product = null;
  imageDirectory = environment.imageDirectory;

  // Ajout et modification d'un article
  allCategories: Categories[] = [];
  addProductGroup: FormGroup;
  updateProductGroup: FormGroup;
  fileToUpload: File = null;
  allManufacturer: Manufacturer[] = [];
  imagePathToShow: string = "";
  editedProductId: number = -1;
  submitted: boolean;
  imageRequired: boolean;
  allColors: Color[];
  isimagePathValid: boolean;
  imagePath: string = null;
  imageUrl: string;
  // Commentaires
  selectedProduct: Product = new Product;
  productComments: Comments[] = [];

  // on Init
  ngOnInit() {
    window.scroll(0,0);
    this.isimagePathValid = true;
    this.submitted = false;
    this.addProductGroup = this._formBuilder.group({
      ProductName: ['', Validators.required],
      ProductColor: ['-1', Validators.required],
      ProductSize: ['', Validators.required],
      ProductCategory: ['-1', Validators.required],
      ProductBrand: ['-1', Validators.required],
      ProductPrice: ['', Validators.required],
      ProductImage: [''],
      ProductDescription: ['', Validators.required],

    });
    this._productService.GetAllColors().subscribe((data: Color[]) => {
      this.allColors = data;
    });
    this._productService.getAllManufacturer().subscribe((data: Manufacturer[]) => {
      this.allManufacturer = data;
    });
    this._categoriesService.getAllMainGategories().subscribe((data) => { this.allMainCategories = data });
    this.getAllProducts();
    this.loading = false;   
    
  }
  //contrôle du formulaire
  get f() { return this.addProductGroup.controls; }
  // Récupération des produits
  getAllProducts() {
    this._productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.allProducts = data;
        this.filterValue = this.allProducts;
      }
    );
  }
  // Action au changement de status d'un article
  onChangeProductStatus(product: Product) {
    // Changement de status
    if (product.isActive == true) {
      product.isActive = false;
    } else {
      product.isActive = true;
    }
    // Update
    this._productService.updateProductStatus(product).subscribe(() => {

    },
      //en cas d'erreur
      (error) => {
        console.log(error);
        return;
      });
  }
  // Filtrer les articles par status 
  filteredByStatus() {
    this.allProducts = this.filterValue;
    if (this.selectedStatus == -1) {
      this.allProducts = this.filterValue;
    } else if (this.selectedStatus == 0) {
      this.allProducts = this.allProducts.filter(p => p.isActive == false);
    } else if (this.selectedStatus == 1) {
      this.allProducts = this.allProducts.filter(p => p.isActive == true);
    }
    this.filteredByCategories();
  }
  // Filtrer les articles avec le texte 
  filteredByText(initial: string) {
    this.allProducts = this.filterValue;
    this.filteredByStatus();
    this.filteredByCategories();
    this.allProducts = this.allProducts.filter(i => i.ProductName.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    this.textToFilterWith = initial.toLocaleLowerCase();
  }
  // Filtrer les articles par catégories
  filteredByCategories() {
    this.allProducts = this.filterValue;

    // Filter avec le texte
    this.allProducts = this.allProducts.filter(i => i.ProductName.toLowerCase().indexOf(this.textToFilterWith) !== -1);


    // Si aucune catégorie principale n'est choisie
    if (this.selectedMainCategory == -1) {
      this.allSubCategories = [];
      this.allSubSubCategories = [];
      this.selectedSubCategory = -1;
      this.selectedSubSubCategory = -1;
      this.allProducts = this.filterValue;
      
    }


    // Si une catégorie principale est choisie
    if (this.selectedMainCategory != -1) {
      // Filtrages par main catégories
      this.allProducts = this.allProducts.filter(p => p.Categories.find(cat => cat.id === this.selectedMainCategory));

      // Récupération des sous-catégories
      this.allSubCategories = [];
      this.allSubSubCategories = [];
      this._categoriesService.getAllCategoriesWithThisTopCategory(this.selectedMainCategory).subscribe(
        (data: Categories[]) => {
           this.allSubCategories = data 
        }
        
      );
    }

    // Si une sous-catégories est choisie
    if (this.selectedMainCategory != -1 && this.selectedSubCategory != -1) {
      // Filtrage par sous catégories
      this.allProducts = this.allProducts.filter(p => p.Categories.find(cat => cat.id === this.selectedSubCategory));

      // Récupération des sous-sous catégories
      this.allSubSubCategories = [];
      this._categoriesService.getAllCategoriesWithThisTopCategory(this.selectedSubCategory).subscribe(
        (data: Categories[]) => { 
          this.allSubSubCategories = data; 
        }
      );
    }


    if (this.selectedMainCategory != -1 && this.selectedSubCategory == -1) {
      this.allSubSubCategories = [];
      this.selectedSubSubCategory = -1;
    }

    // Si une sous-sous-catégorie est  choisie
    if (this.selectedMainCategory != -1 && this.selectedSubCategory != -1 && this.selectedSubSubCategory != -1) {
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
  // Reset de tous les filtres
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
  /*
    AJOUT ET MODIFICATION D'UN ARTICLE
  */
  // Mise à jour de la liste des catégories pour l'ajout d'article
  updateCategory() {
    if (this.addProductGroup.value.ProductCategory != -1) {
      this._categoriesService.getAllCategoriesWithThisTopCategory(this.addProductGroup.value.ProductCategory).subscribe(
        (data: Categories[]) => {
          if (data != null) {
            let previousCat: Categories;
            previousCat = this.allCategories.find(cat => cat.id == this.addProductGroup.value.ProductCategory);
            this.allCategories = data;
            this.allCategories.push(previousCat);
          };
        }
      );
    };
  }
  // Reset de la liste des catégories
  clearCategory() {
    this.allCategories = this.allMainCategories;
    this.addProductGroup.value.ProductCategory = "-1";
  }
  // Récupérer l'image du produit et la stock
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    //this.imagePath = this.imageDirectory+this.fileToUpload.name;
    if (this.fileToUpload != null) {
      const formData = new FormData();
      formData.append('image', this.fileToUpload);
      this.isImagePathAvailable();
      if (this.isimagePathValid) {
        this._productService.uploadProductImage(formData).subscribe(() => {
          this.imagePathToShow = this.fileToUpload.name;

        });
      }
    }
  }
  // ouverture du modal
  openModalAddProduct(targetModal) {
    this.imagePathToShow = '';
    this.imageRequired = true;
    console.log(this.f.ProductImage.valueChanges);

    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      scrollable: true
    });
    this.allCategories = this.allMainCategories;

  }
  // Action pour la création d'un article
  onSubmitAdd() {
    this.submitted = true;
    // Stop si le formulaire n'est pas correctement rempli
    if (this.addProductGroup.invalid || this.f.ProductImage.value == '' && this.imageRequired) {
      return;
    }
    if (!this.isimagePathValid) {
      return;
    }


    let productToAdd: Product = new Product;

    productToAdd.ProductName = this.addProductGroup.value.ProductName;
    productToAdd.ProductUnitPrice = this.addProductGroup.value.ProductPrice;
    productToAdd.ProductDescription = this.addProductGroup.value.ProductDescription;
    productToAdd.ProductColorId = Number(this.addProductGroup.value.ProductColor);
    productToAdd.ImagePath = this.fileToUpload.name;
    productToAdd.ManufacturerId = this.addProductGroup.value.ProductBrand;
    productToAdd.ProductSize = this.addProductGroup.value.ProductSize;
    productToAdd.CategoryId = this.addProductGroup.value.ProductCategory;

    this._productService.addProduct(productToAdd).subscribe(
      () => {
        console.log("ok");
        this._modalService.dismissAll();
        this.addProductGroup.reset();
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        this.submitted = false;
      }
    );


  }
  // Ouverture du modal de modification
  openModalEdit(targetModal, product: Product) {

    this.imageRequired = false;
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      scrollable: true
    });
    //vérifie si le produit a un lockedby actif
    this.editedProductId = product.id_Product;
    this.imagePathToShow = product.ImagePath;

    this._categoriesService.getAllCategoriesWithThisTopCategory(product.CategoryId).subscribe(
      (data: Categories[]) => {
        if (data != null) {
          this.allCategories = data;
        } else {
          this.allCategories = product.Categories.filter(cat => cat.id == product.CategoryId);
        };
      }
    );

    this.addProductGroup.patchValue({
      ProductName: product.ProductName,
      ProductColor: product.ProductColor,
      ProductSize: product.ProductSize,
      ProductCategory: product.CategoryId,
      ProductBrand: product.ManufacturerId,
      ProductPrice: product.ProductUnitPrice,
      ProductDescription: product.ProductDescription

    });
    this.onCheckLock();

  }
  //Obtient un lock pour l'edition d'un produit
  onAcquireLock() {
    this._productService.AddLock(this.editedProductId, this.currentUsername).subscribe((data) => {
    },
      (error) => {
        console.log(error);
      });
    console.log('libre pour edition');
  }
  //Test si le form d'edition d'un produit est locked
  onCheckLock() {
    this._productService.CheckLock(this.editedProductId).subscribe((data: Customer) => {
      //Récupère le nom d'utilisateur si présent pour cet article
      this.LockedBy = data.LockedBy;

      //Vérifie si un lock est présent
      if (data) {
        //Vérifie si l'utilisateur actuel est le proprietaire du lock
        if (this.currentUsername === this.LockedBy) {
          //Si oui met à jour le locktime
          this._productService.UpdateLock(this.editedProductId).subscribe((data) => {
          },
            (error) => {
              console.log(error);
            });
          this.LockedBy = this.currentUsername;
          console.log('vous avez le lock');
          this.isLocked = false;
        }
        //Si non affiche un message avec le nom du proprietaire du lock
        //désactive le bouton de submit
        if (this.currentUsername != this.LockedBy) {
          console.log('Verrouillé par ' + this.LockedBy);
          this.isLocked = true;
          this.loading = false;
        }
      }
      //Si aucun lock est présent,en ajoute un.
      else {
        this.onAcquireLock();
        this.isLocked = false;
      }
    },
      (error) => {
        console.log(error);
      });
  }
  //Libère le formulaire pour l'edition
  onReleaseLock() {
    this._productService.ReleaseLock(this.editedProductId, this.currentUsername).subscribe((data) => {
    },
      (error) => {
        console.log(error);
      });
  }
  //force le unlock
  onForceReleaseLock() {
    this._productService.ForceReleaseLock(this.editedProductId).subscribe(() => {
      this.isLocked = false;
      this.onAcquireLock();
    },
      (error) => {
        console.log(error);
      });

  }
  //  Action pour la modification d'un article
  onSubmitEdit() {
    this.submitted = true;
    // Stop si le formulaire n'est pas correctement rempli
    if (this.addProductGroup.invalid) {
      return;
    }
    if (!this.isimagePathValid) {
      return;
    }
    this.loading = true;
    //Vérifie si quelqu'un a commancer à éditer un produit
    this.onCheckLock();

    setTimeout(() => {
      if (this.isLocked) {
        return;
      }
      let productToUpdate: Product = new Product;
      productToUpdate.id_Product = this.editedProductId;
      productToUpdate.ProductName = this.addProductGroup.value.ProductName;
      productToUpdate.ProductUnitPrice = this.addProductGroup.value.ProductPrice;
      productToUpdate.ProductDescription = this.addProductGroup.value.ProductDescription;
      productToUpdate.ProductColor = this.addProductGroup.value.ProductColor;
      if (this.fileToUpload != null) {
        productToUpdate.ImagePath = this.fileToUpload.name;
      } else {
        productToUpdate.ImagePath = this.imagePathToShow;
      }
      productToUpdate.ManufacturerId = this.addProductGroup.value.ProductBrand;
      productToUpdate.ProductSize = this.addProductGroup.value.ProductSize;
      productToUpdate.CategoryId = this.addProductGroup.value.ProductCategory;
      //Met à jour le produit
      this._productService.updateProduct(productToUpdate).subscribe(
        () => {
          //Si tout est ok enlève le lock, ferme le modal et relance la vue
          this.onReleaseLock();
          this._modalService.dismissAll();
          this.addProductGroup.reset();
          this.ngOnInit();
        },
        (error) => { }
      );
    }, 500);
  }
  // Fermeture d'un modal
  closeModal(targetModal) {
    this.onReleaseLock();
    this._modalService.dismissAll(targetModal);
    this.addProductGroup.reset();
    this.ngOnInit();
  }
  // ouverture du modal d'aperçu d'article
  openModalPreview(targetModal, product) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'md'
    });
    this.selectedProductPreview = product;
  }
  // ouverture du modal pour la gestion des commentaires
  openModalComments(targetModal, product) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg',
      scrollable: true
    });
    this.selectedProduct = product;
    this._commentsService.getAllProductsComments(this.selectedProduct.id_Product).subscribe(data => { this.productComments = data });
  }
  // Action au changement de status d'un commentaire
  onChangeCommentStatus(comment: Comments) {
    // Changement de status
    if (comment.isActive == true) {
      comment.isActive = false;
    } else {
      comment.isActive = true;
    }
    // Update
    this._commentsService.updateCommentStatus(comment).subscribe(() => {
    },
      //en cas d'erreur
      (error) => {
        console.log(error);
        return;
      });
  }
  //Check si le nom de l'image est disponible
  isImagePathAvailable() {
    //Si une erreur de retour Affiche un message de nom invalide
    this._productService.checkImagePathAvability(this.fileToUpload.name).then(
      () => {
        this.isimagePathValid = true;
      },
      (error) => {
        this.isimagePathValid = false;
      }
    );
  }
  //Récupere le taille de la page pour le slice des données
  pageSizeEvent($event) {
    this.pageSize = $event;
  }
  //Récupère le total d'items par page pour le slice des données
  itemsPerPageEvent($event) {
    this.itemsPerPage = $event;
  }
}