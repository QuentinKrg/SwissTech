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
import { ManageAdminsComponent } from './components/my-profile/admin-panel/manage-admins/manage-admins.component';
import { ManageCommentsComponent } from './components/my-profile/admin-panel/manage-comments/manage-comments.component';
import { ManageCustomersComponent } from './components/my-profile/admin-panel/manage-customers/manage-customers.component';
import { ManageOrdersComponent } from './components/my-profile/admin-panel/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/my-profile/admin-panel/manage-products/manage-products.component';
import { AdminGuard } from './helpers/admin.guard';



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
        { path: 'manageproducts', component: ManageProductsComponent, canActivate: [AdminGuard]},
        { path: 'manageorders', component: ManageOrdersComponent, canActivate: [AdminGuard]},
        { path: 'managecustomers', component: ManageCustomersComponent, canActivate: [AdminGuard]},
        { path: 'managecomments', component: ManageCommentsComponent, canActivate: [AdminGuard]},
        { path: 'manageadmins', component: ManageAdminsComponent, canActivate: [AdminGuard]}, 
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