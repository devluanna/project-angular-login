import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/AuthGuard';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UpdatePasswordComponent } from './pages/update-password/update-password.component';
import { LayoutDefaultPagesComponent } from './components/layout-default-pages/layout-default-pages.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { 
    path: 'signup',
    component: SignupComponent,

  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  {
    path: '',
    component: LayoutDefaultPagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user', component: HomeComponent },
      { path: 'update-password', component: UpdatePasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
