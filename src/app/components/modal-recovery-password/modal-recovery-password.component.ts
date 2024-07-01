import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output  } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecoveryPasswordService } from 'src/app/services/recovery-password';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface RecoveryPasswordForm {
  email: FormControl,
}

@Component({
  selector: 'app-modal-recovery-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent],
  providers:[
    RecoveryPasswordService
  ],
  templateUrl: './modal-recovery-password.component.html',
  styleUrl: './modal-recovery-password.component.scss'
})
export class ModalRecoveryPasswordComponent {
  recoveryPasswordForm!: FormGroup<RecoveryPasswordForm>;

  @Input() disablePrimaryBtn: boolean = true;

  @Input() registeredEmail: string = '';
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output("submit") onSubmit = new EventEmitter();

  constructor(
    private router: Router,
    private recoveryPasswordService: RecoveryPasswordService,
    private toastService: ToastrService
  ) {
    this.recoveryPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submit() {
    console.log('Submitting form with email:', this.recoveryPasswordForm.value.email);

    this.recoveryPasswordService
      .recoveryPassword(this.recoveryPasswordForm.value.email)
      .pipe(
        catchError(error => {
          console.error('API error:', error);
          this.toastService.error("Unexpected error! Try again later");
          return of(null); 
        })
      )
      .subscribe(response => {
        if (response) {
          console.log('API success response:', response);
          this.toastService.success("Email successfully sent!!");
        }
      });
  }


  onClose() {
    this.closeModal.emit();
  }

}
