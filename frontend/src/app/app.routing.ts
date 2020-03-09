import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyProfileSidebarComponent } from './components/my-profile/my-profile-sidebar/my-profile-sidebar.component';



const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'myprofile', component: MyProfileComponent, canActivate: [AuthGuard] },
    { path: '', component:MyProfileSidebarComponent },

    // Autrement redirige to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);