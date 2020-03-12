import { Component, OnInit, Input } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { ProductListComponent } from '../product-list/product-list.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  categoriesList: Categories[];
  filteredCategoryList: Categories[];

  selectedCategory: number;
  searchString: string;

  @Input() productList: ProductListComponent;
  constructor(private categoryService: CategoriesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['query']) { this.searchString = params['query']};
      if(params['id']) { this.selectedCategory = params['id']};
    });
  }

  getCategoriesAndSubOnes(id: number) {
    
  }

}
