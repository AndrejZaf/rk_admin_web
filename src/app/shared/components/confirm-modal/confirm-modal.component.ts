import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() isDangerousOperation = false;
  @Output() emitData: EventEmitter<void> = new EventEmitter();

  constructor(private activeModal: NgbActiveModal) {}

  close(): void {
    this.activeModal.close();
  }

  confirm(): void {
    this.emitData.emit();
    this.activeModal.close();
  }
}
