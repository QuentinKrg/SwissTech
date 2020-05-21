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
  //icones
  faEllipsisV=faEllipsisV;

  catUpdateData: boolean;
  catUpdateDataMessage: string;
  submitted:boolean;
  editCatForm: FormGroup;
  selectedCat: Categories;
  allCat: Categories[];
  constructor(
    private _categoriesService: CategoriesService,
    private _modalService: NgbModal,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.editCatForm = this.fb.group({
      CategoryName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
    
     });
    this._categoriesService.getAllCategories().subscribe(data => this.allCat = data);
    this.submitted =false;
    this.catUpdateData= false;
    this.catUpdateDataMessage='';
  }
  
  get f() { return this.editCatForm.controls; }
  openModal(targetModal, cat) {
    this._modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.selectedCat= cat;
    this.f.CategoryName.setValue(cat.CategoryName);

   }
   closeModal(){
    this._modalService.dismissAll();
    this.ngOnInit();
  }
  onSubmit(){
  this.submitted=true;
    if(this.editCatForm.invalid ){
      return;
    }
     
    this._modalService.dismissAll();
    
    //update de l'utilisateur
    this._categoriesService.updateCategory(this.selectedCat.id,this.editCatForm.value).subscribe(
      () => {
        if(this.editCatForm.value.CategoryName != null){
          this.selectedCat.CategoryName = this.editCatForm.value.CategoryName;
        }
        
        this.ngOnInit();
        this.catUpdateData = true;
        this.catUpdateDataMessage = 'Les modifications ont été sauvegardées';
      },  
      //en cas d'erreur
      (error) => {
        
        this.submitted=false;
        console.log(error);
        return;
      });
  }
}
