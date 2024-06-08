import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/AuthGuard';
import { UserComponent } from './pages/user-auth/user-auth.component';

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
},
{
  path: "user",
  component: UserComponent,
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
