import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  @Input() title?: string;
  @Input() body?: string;
  @Input() confirmationText?: string;
  @Input() cancelationText?: string;
  @Input() isDangerousOperation: boolean = false;

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }

  confirm(): void {
    this.activeModal.close();
  }
}
