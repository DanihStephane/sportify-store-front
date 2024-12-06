import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';
import {HomeComponent} from './app/home/home.component';
import {UserComponent} from './app/user/user.component';
import {CartComponent} from './app/cart/cart.component';
import {LoginadminComponent} from './app/loginadmin/loginadmin.component';
import {GestionuserComponent} from './app/gestionuser/gestionuser.component';
import {GestioncatalogueComponent} from './app/gestioncatalogue/gestioncatalogue.component';
import {GestioncommandeComponent} from './app/gestioncommande/gestioncommande.component';
import {GestionstockComponent} from './app/gestionstock/gestionstock.component';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { AuthInterceptor } from './app/login/login.auth.interceptor';
import { AuthGuard } from './app/service/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  //partie admin
  { path: 'loginadmin', component: LoginadminComponent },
  { path: 'gestionuser', component: GestionuserComponent },
  { path: 'gestioncatalogue', component: GestioncatalogueComponent },
  { path: 'gestioncommande', component: GestioncommandeComponent },
  { path: 'gestionstock', component: GestionstockComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([AuthInterceptor])
    )
  ],
});
