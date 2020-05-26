import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  currentUser: User;
  searchForm: FormGroup;
  mainCategories: Categories[];
  cartCount: number = 0;
  
  //icones
  faShoppingCart=faShoppingCart;

  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private categoriesService: CategoriesService,
    private dataService: DataService,
    private _route: ActivatedRoute
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  textSearch: string = "";
  
  ngOnInit() {
    this.textSearch = "";
    this.dataService.count.subscribe(count => this.cartCount = count);
    this.categoriesService.getAllMainGategories()
      .subscribe((data: Categories[]) =>{
        this.mainCategories = data;       
    });   
    
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });

    this._route.queryParams.subscribe(params =>  { 
      // Filtrer les article par ob = order by
      if(params['q'] == null) {
        this.textSearch = "";
      } else {
        this.textSearch = params['q']
      }
     });

    

  }

  onSearch(query: string) {
    if(query != "" && query != null) {
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['products'],
            {
              queryParams: {q: query},
              queryParamsHandling: 'merge'
            }
          );
      });
    }

  }

  refreshResults(category: Categories) {
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['products'],
        {
          queryParams: {cat: category.id},
          queryParamsHandling: 'merge'
        }
      );
    }); 
  }
    
  onSubmit() {
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }

}
