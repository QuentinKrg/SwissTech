import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { CategoriesService } from 'src/app/services/categories.service';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
//VARIABLES
  //icones
  faEllipsisV = faEllipsisV;

  //Pagination
  pageSize: number;
  itemsPerPage: number;

  //Propriétés et données
  allSubCategoriesAvailable: Categories[] = [];
  allSubCategories: Categories[] = [];
  catUpdateData: boolean;
  errorMessage: string;
  addError: boolean;
  catUpdateDataMessage: string;
  submitted: boolean;
  editCatForm: FormGroup;
  selectedCat: Categories;
  allCat: Categories[];
  filterValue: Array<any> = [];
  filterText: string;

  constructor(
    private _categoriesService: CategoriesService,
    private _modalService: NgbModal,
    private _fb: FormBuilder) { }

  ngOnInit() {
    window.scroll(0,0);
    //création d'un reactiveForm pour l'édition d'un catégorie
    this.editCatForm = this._fb.group({
      CategoryName: ['', [Validators.required]],
      FK_Category: [''],
    });
    //Récupère toutes les catégories
    this._categoriesService.getAllCategories().subscribe(data => {
      this.allCat = data;
      this.filterValue = this.allCat;
    });
    //Ré / initialise les variable
    this.submitted = false;
    this.catUpdateData = false;
    this.catUpdateDataMessage = '';
    this.errorMessage = '';
    this.addError = false;
  }
//création d'un control de formulaire
  get f() { return this.editCatForm.controls; }

  //à l'ouverture d'un modal d'édition d'une cat
  openModal(targetModal, cat) {
    //Paramètres et caracteristiques du modal
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
    this.selectedCat = cat;
    //Affecte le nom de la catégorie sélectionnée au formulaire
    this.f.CategoryName.setValue(cat.CategoryName);
    //Récupère toutes les sous cat de la catégorie sélectionnée
    this._categoriesService.getAllCategoriesWithThisTopCategory(this.selectedCat.id).subscribe(
      (data: Categories[]) => { 
        this.allSubCategories = data }
    );
  }
  //à l'ouverture d'un modal d'ajout de cat.
  openAddModal(targetModal) {
    this._modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });
  }
  //à la fermeture d'un modal
  closeModal() {
    //Ferme le modal
    this._modalService.dismissAll();
    //Réinitialise le component
    this.ngOnInit();
  }
  //Pagination - Changement de page
  onPageChange(pageNum: number): void {
    this.pageSize = this.itemsPerPage * (pageNum - 1);
  }
  //Pagination - Changement de nombre d'items par page
  changePagesize(num) {
    this.itemsPerPage = num;
  }
  //Envoi d'un formulaire d'edition
  onSubmit() {
    this.submitted = true;
    //Stop si le formulaire n'est pas correctement rempli
    if (this.editCatForm.invalid) {
      return;
    }
    //Met à jour la catégorie
    this._categoriesService.updateCategory(this.selectedCat.id, this.editCatForm.value).subscribe(
      () => {
      //met à jour l'affichage 
        if (this.editCatForm.value.CategoryName != null) {
          this.selectedCat.CategoryName = this.editCatForm.value.CategoryName;
        }
        //Ferme le modal et relance la page
        this.closeModal();
        //Affiche un message 
        this.catUpdateData = true;
        this.catUpdateDataMessage = 'Les modifications ont été sauvegardées';
      },
      //en cas d'erreur
      (error) => {

        this.submitted = false;
        return;
      });
  }
  onUpdateCategoryStatus(cat) {

    if (cat.IsActive == true) {
      cat.IsActive = false;
    } else {
      cat.IsActive = true;
    }
    this._categoriesService.updateCategoryStatus(cat).subscribe(
      () => {
      },
      //en cas d'erreur
      (error) => {
        return;
      });
  }
  onSubmitAdd() {
    this.submitted = true;
    if (this.editCatForm.invalid) {
      return;
    }
    this._categoriesService.addCategory(this.editCatForm.value).subscribe(
      () => {
        this._modalService.dismissAll();
        this.ngOnInit();
      },
      //en cas d'erreur
      (error) => {
        this.addError = true;
        this.errorMessage = 'Cette catégorie existe';
        this.submitted = false;

        return;
      });
  }
  // Filtrer les articles avec le texte 
  filteredByText(initial: string) {
    this.allCat = this.filterValue;
    this.allCat = this.allCat.filter(i => i.CategoryName.toLowerCase().indexOf(initial.toLocaleLowerCase()) !== -1);
    this.filterText = initial.toLocaleLowerCase();
  }
  //Récupère la taille de la page
  pageSizeEvent($event) {
    this.pageSize = $event;
  }
  //Récupère le nombre d'item par page
  itemsPerPageEvent($event) {
    this.itemsPerPage = $event;
  }
}
