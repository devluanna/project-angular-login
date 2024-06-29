import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/AuthGuard';
import { HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
},
{
  path: "user",
  component: HomeComponent,
  canActivate: [AuthGuard]
},
{ path: '', redirectTo: '/login', pathMatch: 'full' },
{
  path: '',
  component: HomeComponent,
  children: [
    { path: '', component: HomeComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
