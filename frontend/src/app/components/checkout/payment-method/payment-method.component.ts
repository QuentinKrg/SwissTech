import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/CustomValidators';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  creditCardForm: FormGroup;
  loading: boolean;
  submitted: boolean;
  currentUsername = this._authenticationService.currentUserValue.login;
  currentUser: Customer = null;
  formError: boolean = false;
  formErrorMessage: string = "";
  radioCard:any = null;
  radioBill:any = null;

  constructor(private _userService: UserService,
              private _formBuilder: FormBuilder,
              private _authenticationService: AuthenticationService) { }

  ngOnInit() {
    // Reset des éléments du formulaire
    this.loading = false;
    this.submitted = false;
    this.radioCard = <HTMLInputElement>document.getElementById("card");
    this.radioBill = <HTMLInputElement>document.getElementById("bill");
    
    
    this.creditCardForm = this._formBuilder.group({
        cardNumber: ['', [Validators.required, Validators.pattern('')]],
        cardName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
        expirationMonthDate: ['', Validators.required],
        expirationYearDate: ['', Validators.required],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9 ]*'), Validators.minLength(3), Validators.maxLength(3)]]
    });
    
    
    // Récupération des données de facturations du client
    this._userService.getCustomer(this.currentUsername).subscribe((data = new Customer) => {
      this._userService.getBillingAddress(this.currentUsername).subscribe((moreData = new Customer) => {
        this.currentUser = Object.assign(data, moreData);      
      });      
    });


  }

  get f() { return this.creditCardForm.controls; }

  onSubmit()
  {    
    if(this.radioCard.checked && !this.radioBill.checked) {
      if(this.creditCardForm.invalid) {
        this.submitted = false;
      }
      // Stop si le formulaire n'est pas correctement rempli
      if (this.creditCardForm.invalid) {
        this.formError = true;
        this.formErrorMessage="Veuillez remplir correctement tous les champs marqués d'un *";
        return;
      }else{
        this.formError = false;
        this.formErrorMessage = "";
      }
    }
    
    // Enregister la méthode de paiement



    // Enregister la commande et mettre avec le bon statuts etc


    // Message de réussite et ensuite redirection vers la page d'accueil et vider le panier etc
  }

}
