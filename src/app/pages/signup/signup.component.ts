import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from 'src/app/components/input/input.component';
import { SignupLayoutComponent } from 'src/app/components/signup-layout-component/signup-layout.component';
import { RegisterService } from 'src/app/services/register-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';
import { roleValidator } from 'src/app/validators/validator-role';

interface SignupForm {
  first_name: FormControl;
  last_name: FormControl;
  email: FormControl;
  role: FormControl;
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    SignupLayoutComponent,
    SuccessModalComponent,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
  ],
  providers: [RegisterService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;
  errorMessage: string = '';
  isModalOpen: boolean = false;
  registeredEmail: string = '';

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      first_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [
        Validators.required,
        roleValidator(['ADMIN', 'USER']),
      ]),
    });
  }

  submit() {
    this.registerService
      .register(
        this.signupForm.value.first_name,
        this.signupForm.value.last_name,
        this.signupForm.value.email,
        this.signupForm.value.role
      )
      .subscribe({
        next: () => {
          this.isModalOpen = true;
          this.registeredEmail = this.signupForm.value.email;
          this.toastService.success('Registration completed successfully!');
          this.router.navigate(['signup']);
        },
        error: (err) => {
          if (err.status === 500) {
            this.errorMessage = 'Email already exists!';
            this.signupForm.controls['email'].setErrors({ emailExists: true });
            console.log('errorMessage');
          } else if (err.status === 500) {
            this.errorMessage = 'This role does not exist, please try ADMIN or USER!';
            this.signupForm.controls['role'].setErrors({ invalidRole: true });
            console.log('errorMessage');
          } else {
            this.toastService.error('Unexpected error! Try again later');
          }
        }
      });
  }

  closeModal() {
    this.isModalOpen = false;
    this.signupForm.reset(); 
    window.location.reload();
  }
  navigate() {
    this.router.navigate(['login']);
  }
}
