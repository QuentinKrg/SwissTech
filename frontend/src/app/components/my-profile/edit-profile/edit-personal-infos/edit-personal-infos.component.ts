import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-edit-personal-infos',
  templateUrl: './edit-personal-infos.component.html',
  styleUrls: ['./edit-personal-infos.component.css']
})
export class EditPersonalInfosComponent implements OnInit {

  editRegisterForm: FormGroup;
  loading;
  submitted;
  returnUrl: string;
  ariaOneisExpended;
  user = new User;
  haveUser: String;
  usernameErrorMessage: String;
  userUpdateDataMessage: String;
  userUpdateData = false;
  isUserValid = true;
  usernameData;
  passwordErrorMessage: String;
  FormErrorMessage: String;
  FormError= false;
  isPasswordCorrect =false;
  changeUsername = false;
  changePassword= false;
  currentUsername = this.authenticationService.currentUserValue.login;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loading=false;
    this.submitted = false;
    
    this.editRegisterForm = this.formBuilder.group({
      CustomerTitle: ['-1', Validators.required],
      CustomerName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerLastName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerBirthday: ['', Validators.required],
      CustomerEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]]
    });
    //Appel au service qui retourne les infos personnelles du clients
    this._userService.getCustomer(this.currentUsername).subscribe(
      (data = new Customer) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues au formulaire
        
        this.f.CustomerTitle.setValue(data.FK_Title);
        this.f.CustomerName.setValue(data.CustomerName);
        this.f.CustomerLastName.setValue(data.CustomerLastName);
        this.f.CustomerBirthday.setValue(data.CustomerBirthday);
        this.f.CustomerEmail.setValue(data.CustomerEmail);
        this.f.CustomerPhone.setValue(data.CustomerPhone);
        this.usernameData = data.Username;
        
      },
      (error) => {
        this.usernameErrorMessage = "Error ";
        console.log(error);
      });
      console.log(this.editRegisterForm);
      
    // Récupérer l'url voulu dans l'URL or default
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.editRegisterForm.controls; }

  onSubmit() {

    //Stop si le formulaire n'est pas valide
    if (this.editRegisterForm.invalid) {
      this.submitted = false;
    }
    // Stop si le formulaire n'est pas correctement rempli
    if (this.editRegisterForm.invalid) {
      this.userUpdateData = false;
      this.FormError = true;
      this.FormErrorMessage="Veuillez remplir correctement tous les champs marqués d'un *";
      return;
    }else{
      this.FormError = false;
      this.FormErrorMessage = "";
    }
    
    //désactive le bouton d'enregistrement
    this.loading = true;

        //update de l'utilisateur
        this._userService.updateCustomer(this.currentUsername,this.editRegisterForm.value).then(
          () => {
            console.log('tout va bien');
            
            this.ngOnInit();
            this.userUpdateData = true;
            this.userUpdateDataMessage = 'Les modifications ont été sauvegardées';
          },  
          //en cas d'erreur
          (error) => {
            console.log(error);
            this.submitted = false;
            this.loading = false;
            return;
          });
  }
}
