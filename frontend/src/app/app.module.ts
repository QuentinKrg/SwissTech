import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditProfileComponent } from './components/my-profile/edit-profile/edit-profile.component';
import { FiltersComponent } from './components/home/filters/filters.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-profile/my-orders/my-orders.component';
import { OrderComponent } from './components/my-profile/order/order.component';
import { OrderDetailsComponent } from './components/my-profile/order-details/order-details.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ReviewComponent } from './components/checkout/review/review.component';
import { ContactInformationComponent } from './components/checkout/contact-information/contact-information.component';
import { ShippingMethodComponent } from './components/checkout/shipping-method/shipping-method.component';
import { PaymentMethodComponent } from './components/checkout/payment-method/payment-method.component';
import { SidebarComponent } from './components/my-profile/sidebar/sidebar.component';


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
    PaginationComponent,
    MyProfileComponent,
    EditProfileComponent,
    FiltersComponent,
    CheckoutComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    OrderComponent,
    OrderDetailsComponent,
    ProductDetailsComponent,
    ReviewComponent,
    ContactInformationComponent,
    ShippingMethodComponent,
    PaymentMethodComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
