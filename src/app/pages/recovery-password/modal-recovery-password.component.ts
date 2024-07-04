import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output  } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecoveryPasswordService } from 'src/app/services/recovery-password';
import { ModalDefaultComponent } from '../../components/modal-default/modal-default.component';
import { EmailSuccessfullySentModal } from './email-successfully-sent-modal/email-successfully-sent-modal';

interface RecoveryPasswordForm {
  email: FormControl,
}

@Component({
  selector: 'app-modal-recovery-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ModalDefaultComponent, EmailSuccessfullySentModal],
  providers:[
    RecoveryPasswordService
  ],
  templateUrl: './modal-recovery-password.component.html',
  styleUrl: './modal-recovery-password.component.scss'
})
export class ModalRecoveryPasswordComponent {
  recoveryPasswordForm!: FormGroup<RecoveryPasswordForm>;
  isModalOpen: boolean = false;
  registeredEmail: string = '';

  @Input() isOpen: boolean = false;
  @Output() onCloseModal = new EventEmitter<void>();

  constructor(
    private router: Router,
    private recoveryPasswordService: RecoveryPasswordService,
    private toastService: ToastrService
  ) {
    this.recoveryPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submit(){
    this.recoveryPasswordService
      .recoveryPassword(this.recoveryPasswordForm.value.email).subscribe({
      next: () => {
        this.toastService.success("Email successfully sent!!");
        this.isModalOpen = true;
        this.registeredEmail = this.recoveryPasswordForm.value.email;
      },
      error: () => this.toastService.error("Unexpected error! Try again later")
    })
  }

  closeModal() {
    window.location.reload();
    this.onCloseModal.emit();
  }


}
