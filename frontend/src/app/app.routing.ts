import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { EditProfileComponent } from './components/my-profile/edit-profile/edit-profile.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './components/my-profile/my-orders/my-orders.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactInformationComponent } from './components/checkout/contact-information/contact-information.component';
import { ShippingMethodComponent } from './components/checkout/shipping-method/shipping-method.component';
import { PaymentMethodComponent } from './components/checkout/payment-method/payment-method.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: ShoppingCartComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent},
    { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard], children: 
        [
        { path: 'editprofile', component: EditProfileComponent},
        { path: 'myorders', component: MyOrdersComponent},
        { path: '', component: EditProfileComponent},    
        { path: 'myprofile', redirectTo: 'myprofile' }
        ] 
    },
    { path:'checkout', component: CheckoutComponent, canActivate: [AuthGuard], children: [
        {path: 'information', component: ContactInformationComponent},
        {path: 'shipping', component: ShippingMethodComponent},
        {path: 'payment', component: PaymentMethodComponent},
    ]},

    // Autrement redirige to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);