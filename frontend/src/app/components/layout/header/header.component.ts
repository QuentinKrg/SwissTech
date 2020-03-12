import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categories } from 'src/app/models/categories';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { DataService } from 'src/app/services/data.service';

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
  
  

  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private categoriesService: CategoriesService,
    private dataService: DataService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  


  ngOnInit() {
    this.dataService.count.subscribe(count => this.cartCount = count);
    this.categoriesService.getAllMainGategories()
      .subscribe((data: Categories[]) =>{
        this.mainCategories = data;
    });
    
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });

    

  }

  onSearch(query: string) {
    if(query == "" || query == null) {
      return;
    }
    this.router.navigate(['search', query]);
    }
  onSubmit() {
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
