import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AlertComponent } from './components/alert/alert.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { appRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TokenInterceptor } from './helpers/token.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ProductListComponent } from './components/home/product-list/product-list.component';
import { ProductCardComponent } from './components/home/product-list/product-card/product-card.component';
import { AddToCartComponent } from './components/shared/add-to-cart/add-to-cart.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditProfileComponent } from './components/my-profile/edit-profile/edit-profile.component';
import { FiltersComponent } from './components/home/filters/filters.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-profile/my-orders/my-orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReviewComponent } from './components/checkout/review/review.component';
import { ContactInformationComponent } from './components/checkout/contact-information/contact-information.component';
import { PaymentMethodComponent } from './components/checkout/payment-method/payment-method.component';
import { SidebarComponent } from './components/my-profile/sidebar/sidebar.component';
import { ManageProductsComponent } from './components/my-profile/admin-panel/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/my-profile/admin-panel/manage-orders/manage-orders.component';
import { ManageCustomersComponent } from './components/my-profile/admin-panel/manage-customers/manage-customers.component';
import { ManageAdminsComponent } from './components/my-profile/admin-panel/manage-admins/manage-admins.component';
import {DatePipe} from '@angular/common';
import { EditAddressComponent } from './components/my-profile/edit-profile/edit-address/edit-address.component';
import { EditLoginInfosComponent } from './components/my-profile/edit-profile/edit-login-infos/edit-login-infos.component';
import { EditPersonalInfosComponent } from './components/my-profile/edit-profile/edit-personal-infos/edit-personal-infos.component';
import { AdminPanelComponent } from './components/my-profile/admin-panel/admin-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProductsComponent } from './components/products/products.component';
import { PrintLayoutComponent } from './components/my-profile/my-orders/print/print-layout/print-layout.component';
import { InvoiceComponent } from './components/my-profile/my-orders/print/invoice/invoice.component';
import { ManageCategoriesComponent } from './components/my-profile/admin-panel/manage-categories/manage-categories.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ContactInfosComponent } from './components/home/contact-infos/contact-infos.component';
import { FAQComponent } from './components/faq/faq.component';
import { RGPDInfosComponent } from './components/rgpdinfos/rgpdinfos.component';
import { LegalsMentionsComponent } from './components/legals-mentions/legals-mentions.component';


@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    ProductCardComponent,
    AddToCartComponent,
    MyProfileComponent,
    EditProfileComponent,
    FiltersComponent,
    CheckoutComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    ProductDetailsComponent,
    ReviewComponent,
    ContactInformationComponent,
    PaymentMethodComponent,
    SidebarComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ManageCustomersComponent,
    ManageAdminsComponent,
    EditAddressComponent,
    EditLoginInfosComponent,
    EditPersonalInfosComponent,
    AdminPanelComponent,
    ProductsComponent,
    PrintLayoutComponent,
    InvoiceComponent,
    ManageCategoriesComponent,
    PaginationComponent,
    ContactInfosComponent,
    FAQComponent,
    RGPDInfosComponent,
    LegalsMentionsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
