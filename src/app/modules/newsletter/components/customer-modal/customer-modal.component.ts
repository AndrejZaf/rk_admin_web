import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomerModalComponent implements OnInit {
  isEdit: boolean = false;
  email: string = '';

  sneakerForm = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}
  ngOnInit(): void {
    this.sneakerForm.get('email')?.setValue(this.isEdit ? this.email : '');
  }

  close(): void {
    this.activeModal.close();
  }
}
