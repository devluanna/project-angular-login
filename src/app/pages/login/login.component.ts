import { Component } from '@angular/core';
import { FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { DefaultLoginLayoutComponent } from 'src/app/components/default-login-layout/default-login-layout.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login-service';
import { ToastrService } from 'ngx-toastr';
import { identityValidator } from './validador-indentity';

interface LoginForm {
  identity: FormControl,
  password: FormControl
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    DefaultLoginLayoutComponent
  ],
  providers:[
    LoginService
  ],
 templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.loginForm = new FormGroup({
      identity: new FormControl('', [Validators.required, identityValidator()]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }


  submit(){
    this.loginService.login(this.loginForm.value.identity, this.loginForm.value.password).subscribe({
      next: () => {
        this.toastService.success("Login feito com sucesso!");
        this.router.navigate(['user']);
      },
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

  navigate(){
    this.router.navigate(["signup"])
  }
}


