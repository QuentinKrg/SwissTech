import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';
import { faShoppingCart, faUserAlt ,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
  faUser =faUserAlt;
  faSignOutAlt =faSignOutAlt;
  
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _authenticationService: AuthenticationService,
    private _categoriesService: CategoriesService,
    private _dataService: DataService,
    private _route: ActivatedRoute
  ) { 
    this._authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  textSearch: string = "";
  
  ngOnInit() {
    this.textSearch = "";
    this._dataService.count.subscribe(count => this.cartCount = count);
    this._categoriesService.getAllMainGategories()
      .subscribe((data: Categories[]) =>{
        this.mainCategories = data;       
    });   
    
    this.searchForm = this._formBuilder.group({
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
      this._router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this._router.navigate(['products'],
            {
              queryParams: {q: query},
              queryParamsHandling: 'merge'
            }
          );
      });
    }

  }

  refreshResults(category: Categories) {
    this._router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this._router.navigate(['products'],
        {
          queryParams: {cat: category.id},
          queryParamsHandling: 'merge'
        }
      );
    }); 
  }

  logout() {
    this._authenticationService.logout();
    this._router.navigate(['/']);
  }

}
