import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user = new User;
  faUser=faUser;
  @Input() isNavBar: Boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { 
    // Redirection si la personne est déjà connectée
    if(this.authenticationService.currentUserValue != null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // Stop si le formulaire n'est pas correctement rempli
    if(this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.authenticationService.login(this.loginForm.value)
      //.pipe(first())
      .subscribe(
        () => {
         this.router.navigate([this.returnUrl]);
         this.closeNav();
        },
        error => {
          this.alertService.error("Vos données de connexion sont erronées. Veuillez réessayer.");
          this.loading = false;
          this.loginForm.reset();
        }
      );
  }

  closeNav() {
    document.getElementById("sideNav").style.width = "0";
  }

}
