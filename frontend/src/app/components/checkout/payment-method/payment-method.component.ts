import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/helpers/CustomValidators';
import { PaymentOrder } from 'src/app/models/paymentorder';
import { DataService } from 'src/app/services/data.service';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { OrdersService } from 'src/app/services/orders.service';
import { Router } from '@angular/router';
import { CreditCard } from 'src/app/models/creditcard';

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
  currentUserId = this._authenticationService.currentUserValue.id;
  currentUser: Customer = null;
  formError: boolean = false;
  formErrorMessage: string = "";
  radioCard:any = null;
  radioBill:any = null;
  cart: ShoppingCart[];
  myBillAddr: Customer[];
  newBillAddress: boolean;
  newAddressForm: FormGroup;
  selectedBillingID: string;
  
  constructor(private _userService: UserService,
              private _formBuilder: FormBuilder,
              private _authenticationService: AuthenticationService,
              private _dataService: DataService,
              private _orderService: OrdersService,
              private _router: Router) { 
                this._dataService.cart.subscribe(a => this.cart = a);
              }

  ngOnInit() {
    
    // Reset des éléments du formulaire
    this.loading = false;
    this.submitted = false;
    this.radioCard = <HTMLInputElement>document.getElementById("card");
    this.radioBill = <HTMLInputElement>document.getElementById("bill");
    
    this.newAddressForm = this._formBuilder.group({
      FullName: ['', Validators.required],
      addressType: ['2'],
      CustomerTitle: ['', Validators.required],
      billingID: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[0-9 ]*')]]
    });
    this.creditCardForm = this._formBuilder.group({
        cardNumber: ['', [Validators.required, Validators.pattern('[0-9 ]*'), Validators.minLength(19), Validators.maxLength(19)]],
        cardName: ['', [Validators.required, Validators.pattern('[a-zA-ZàâæçéèêëîïôœùûüÿÀÂÆÇnÉÈÊËÎÏÔŒÙÛÜŸ -]*')]],
        expirationMonthDate: ['', Validators.required],
        expirationYearDate: ['', Validators.required],
        securityCode: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(3), Validators.maxLength(3)]]
    });
  
    
    // Récupération des données de facturations du client
    this._userService.getCustomer(this.currentUsername).subscribe((data = new Customer) => {
      this._userService.getBillingAddress(this.currentUsername).subscribe((moreData = new Customer) => {
        this.currentUser = Object.assign(data, moreData);      
      });      
    });

    this.getAllBillingsAddress();
    this.newBillAddress = false;

  }

  // Retourne la validation du formulaire
  get f() { return this.creditCardForm.controls; }

  // Formatage de la carte de crédit
  onFormatCardNumber(){
    const numbvalue = <HTMLInputElement>document.getElementById("cardNumber");
      if (numbvalue.value.length==4 || numbvalue.value.length==9 ||numbvalue.value.length==14){
        numbvalue.value = numbvalue.value +" ";
      }
  }
  getAllBillingsAddress() {
    //Service qui retourne l'adresse de livraison et assigne les données au formulaire
    this._userService.getAllBillingsAddress(this.currentUsername).subscribe(
      (data: Customer[]) => {
        this.myBillAddr = data;
        this.myBillAddr = this.myBillAddr;
        console.log(data);

      },
      (error) => {
        console.log(error);
      });
  }
  get f2() { return this.newAddressForm.controls; }

  onNewBillAddress(value) {
    if (value == -1) {
      this.newBillAddress = true;
    } else {
      this.newBillAddress = false;
    }
  }
  onSubmit(address)
  {    
    
    //Recupère l'adresse choisie dans la liste
    const addressObj = JSON.parse(address);

    //si =-1 l'utilisateur veut ajouter une nouvelle adresse
    if (address == -1) {

      //teste si le formulaire est correctement rempli
      if(this.newAddressForm.invalid){
        return;
      }
      //Ajoute une nouvelle adresse
      this._userService.addAddress(this.currentUsername, this.newAddressForm.value).subscribe(
        () => {
          //Recupère la dernière adresse ajoutée par rapport son id
          this._userService.getLastBillingAddress(this.currentUsername).subscribe((moreData = new Customer) => {
            //Denifit tant que adresse de commande
            this.selectedBillingID = moreData.id_Address.toString();
          });
        }, (error) => {
          console.log(error);

        });

    } else {
      //Si autre option, on définit l'adresse choisi avec l'id
      this.selectedBillingID = addressObj.billingID;
    }
  setTimeout(()=> {
    this.submitted=true;
    if(this.radioCard.checked && !this.radioBill.checked) {
      // Stop si le formulaire n'est pas correctement rempli
      // TODO modifié le test
      if (this.creditCardForm.invalid) {
        console.log("test 1");
        this.formError = true;
        this.formErrorMessage="Veuillez remplir correctement tous les champs marqués d'un *";
        return;
      }else{
        console.log("test 2");
        this.formError = false;
        this.formErrorMessage = "";
      }
    }

    let paymentOrder = new PaymentOrder;

    //Définit les adresses de la commande à passer au backend
    paymentOrder.FK_Order_BillingAddress = this.selectedBillingID;
    paymentOrder.FK_Order_ShippingAddress= localStorage.getItem('shippingID');

    // Id du client
    paymentOrder.id_user = this.currentUserId;

    // Si le radio bouton "card" est coché => méthode de payement = carte de crédit
    if(this.radioCard.checked && !this.radioBill.checked) {
      paymentOrder.paymentMethodCode="CC";      
    }
    // Si le radio bouton "bill "est coché => méthode de payement = facture
    else if(!this.radioCard.checked && this.radioBill.checked) {
      paymentOrder.paymentMethodCode="FAC"; 
    }

    

    // Panier du client
    paymentOrder.shoppingCart = this.cart;
    
    // Création de la commande
    this._orderService.addNewOrder(paymentOrder).subscribe(() => {


      // Insertion des infortmation de la carte de crédit si besoin
      if(this.radioCard.checked && this.creditCardForm.valid) {
        
        let creditCard = new CreditCard;
        creditCard.cardNumber = this.creditCardForm.value.cardNumber;
        creditCard.cardName = this.creditCardForm.value.cardName;
        creditCard.cardCode = this.creditCardForm.value.securityCode;
        creditCard.expirationMonthDate = this.creditCardForm.value.expirationMonthDate;
        creditCard.expirationYearDate = this.creditCardForm.value.expirationYearDate;
        creditCard.id_client = this.currentUserId;
        
        this._orderService.addCreditCard(creditCard).subscribe();
      }

      // Clear et update le cart
      this.cart.length = 0;
      this.cart = [];
      this._dataService.updateCartItemCount(0);
      this._dataService.updateShoppingCart(this.cart);
      localStorage.removeItem('Cart');
      localStorage.removeItem('ProductsInTheCart');
      localStorage.removeItem('shippingID');
      

      // Redirection
      this._router.navigate(['/']);
    });

    

  },200);

  }

}
