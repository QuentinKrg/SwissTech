import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-edit-personal-infos',
  templateUrl: './edit-personal-infos.component.html',
  styleUrls: ['./edit-personal-infos.component.css']
})
export class EditPersonalInfosComponent implements OnInit {
 //propriétés de vérification et de tests
  editRegisterForm: FormGroup;
  loading;
  submitted;
  userUpdateDataMessage: String;
  userUpdateData = false;
  FormErrorMessage: String;
  FormError= false;
  //Récupère le nom d'user actuel
  currentUsername = this._authenticationService.currentUserValue.login;

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    //On Re/initialise les contrôles du formulaire
    this.loading=false;
    this.submitted = false;
    //Création d'un reactive form
    this.editRegisterForm = this._formBuilder.group({
      FK_Title: ['-1', Validators.required],
      CustomerName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerLastName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
      CustomerBirthday: ['', Validators.required],
      CustomerEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
      CustomerPhone: ['', [Validators.required, Validators.pattern('[0-9 - + .]*')]]
    });
    //Appel au service qui retourne les infos personnelles du clients
    this._userService.getCustomer(this.currentUsername).subscribe(
      (data = new Customer) => { //Retourne data qui contient un objet de type Customer, puis assigne les valeurs reçues au formulaire
        
        this.f.FK_Title.setValue(data.FK_Title);
        this.f.CustomerName.setValue(data.CustomerName);
        this.f.CustomerLastName.setValue(data.CustomerLastName);
        this.f.CustomerBirthday.setValue(data.CustomerBirthday);
        this.f.CustomerEmail.setValue(data.CustomerEmail);
        this.f.CustomerPhone.setValue(data.CustomerPhone);
        
      },
      (error) => {
        console.log(error);
      });
  }
//Création d'un controleur de formulaire pour les validation des champs
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
