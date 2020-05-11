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
import { PaymentMethodComponent } from './components/checkout/payment-method/payment-method.component';
import { ManageAdminsComponent } from './components/my-profile/admin-panel/manage-admins/manage-admins.component';
import { ManageCustomersComponent } from './components/my-profile/admin-panel/manage-customers/manage-customers.component';
import { ManageOrdersComponent } from './components/my-profile/admin-panel/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/my-profile/admin-panel/manage-products/manage-products.component';
import { AdminGuard } from './helpers/admin.guard';
import { EditAddressComponent } from './components/my-profile/edit-profile/edit-address/edit-address.component';
import { EditLoginInfosComponent } from './components/my-profile/edit-profile/edit-login-infos/edit-login-infos.component';
import { EditPersonalInfosComponent } from './components/my-profile/edit-profile/edit-personal-infos/edit-personal-infos.component';
import { AdminPanelComponent } from './components/my-profile/admin-panel/admin-panel.component';
import { ProductsComponent } from './components/products/products.component';



const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: ShoppingCartComponent},
    { path: 'products', component: ProductsComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent},
    { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard], children: 
        [
        { path: 'editprofile', component: EditProfileComponent},
        { path: 'editaddress', component: EditAddressComponent},
        { path: 'editlogininfos', component: EditLoginInfosComponent},
        { path: 'editpersonalinfos', component: EditPersonalInfosComponent},
        { path: 'myorders', component: MyOrdersComponent},
        { path: '', component: EditProfileComponent},   
        { path: 'myprofile', redirectTo: 'myprofile' }
        ] 
    },
    { path: 'admin', component: MyProfileComponent, canActivate: [AdminGuard], children:
        [
        { path: 'manageproducts', component: ManageProductsComponent},
        { path: 'manageorders', component: ManageOrdersComponent},
        { path: 'managecustomers', component: ManageCustomersComponent},
        { path: 'manageadmins', component: ManageAdminsComponent}, 
        { path: '', component: AdminPanelComponent},
        ]
    },
    { path:'checkout', component: CheckoutComponent, canActivate: [AuthGuard], children: [
        {path: 'information', component: ContactInformationComponent},
        {path: 'payment', component: PaymentMethodComponent},
    ]},

    // Autrement redirige to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);