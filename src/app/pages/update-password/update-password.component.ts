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
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { roleValidator } from 'src/app/validators/validator-role';
import { SuccessModalComponent } from '../signup/success-modal/success-modal.component';
import { HomeComponent } from '../home/home.component';
import { UpdatePasswordService } from 'src/app/services/update-password';

interface UpdatePasswordForm {
  password: FormControl;
  confirmPassword: FormControl;
}

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    SignupLayoutComponent,
    SuccessModalComponent,
    ReactiveFormsModule,
    InputComponent,
    CommonModule,
    HomeComponent,
  ],
  providers: [UpdatePasswordService],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent {
  updatePasswordForm!: FormGroup<UpdatePasswordForm>;
  errorMessage: string = '';
  isModalOpen: boolean = false;
  passwordUser: string = '';
  passwordConfirmationUser: string = '';

  constructor(
    private router: Router,
    private updatePasswordService: UpdatePasswordService,
    private toastService: ToastrService
  ) {
    this.updatePasswordForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ])
    });

   }
   
   submit() {
    if (this.updatePasswordForm.valid) {
      this.updatePasswordService
        .updatePassword(
          this.updatePasswordForm.value.password,
          this.updatePasswordForm.value.confirmPassword
        )
        ?.subscribe({
          next: () => {
            this.toastService.success('Password updated successfully!');
            this.router.navigate(['home']);
          },
          error: (err) => {
            if (this.updatePasswordForm.value.password !== this.updatePasswordForm.value.confirmPassword) {
              this.errorMessage = 'Passwords are not the same!';
              this.updatePasswordForm.controls['password'].setErrors({ passwordNotMatch: true });
            } else (err.status === 500) ;{
              this.errorMessage = 'Unexpected error! Try again later';
            }
            console.error('Error updating password! ', err);
          },
        });
    }
  }
      

  closeModal() {
    window.location.reload();
  }

  navigate() {
    this.router.navigate(['login']);
  }
}
