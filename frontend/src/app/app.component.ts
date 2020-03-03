import { Component } from '@angular/core';
import { User } from './models/user';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: User;
  searchForm: FormGroup;

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    });
  }

  onSubmit() {
    
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
