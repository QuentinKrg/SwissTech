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



const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'cart', component: ShoppingCartComponent},
    { path: 'product-details/:id', component: ProductDetailsComponent},
    { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard], children: 
        [
        { path: 'editprofile', component: EditProfileComponent, outlet: 'profilecontent1'},
        { path: 'myorders', component: MyOrdersComponent, outlet: 'profilecontent1'},
        { path: '', component: EditProfileComponent, outlet: 'profilecontent1'},    
        { path: 'myprofile', redirectTo: 'myprofile' }
        ] 
    },

    // Autrement redirige to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);