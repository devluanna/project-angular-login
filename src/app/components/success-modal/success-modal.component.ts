import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-modal.component.html',
  styleUrl: './success-modal.component.scss'
})
export class SuccessModalComponent {
  @Input() registeredEmail: string = '';
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }

}
