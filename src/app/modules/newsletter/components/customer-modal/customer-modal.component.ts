import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomerModalComponent {
  isEdit = false;
  sneakerForm = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  close(): void {
    this.activeModal.close();
  }
}
