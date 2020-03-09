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
import { MyProfileSidebarComponent } from './components/my-profile/my-profile-sidebar/my-profile-sidebar.component';



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
    MyProfileSidebarComponent
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
