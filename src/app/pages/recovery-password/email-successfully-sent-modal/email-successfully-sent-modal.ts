import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output  } from '@angular/core';
import { ModalDefaultComponent } from '../../../components/modal-default/modal-default.component';

@Component({
  selector: 'app-successfully-email-modal',
  standalone: true,
  imports: [CommonModule, ModalDefaultComponent],
  templateUrl: './email-successfully-sent-modal.html',
})
export class EmailSuccessfullySentModal {
  @Input() registeredEmail: string = '';
  @Input() isOpen: boolean = false;
  @Output() onCloseModal = new EventEmitter<void>();

  closeModal() {
    this.onCloseModal.emit();
  }

}
