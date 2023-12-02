import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsletterSubscriptionDTO } from '../../dtos/newsletter-subscription.dto';
import * as newsletterActions from '../../store/newsletter.actions';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { AddNewsletterSubscriptionSuccess } from './../../store/newsletter.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomerModalComponent implements OnInit {
  isEdit: boolean = false;
  newsletterSubscription: NewsletterSubscriptionDTO | undefined;
  unsubscribe$ = new Subject<void>();

  newsletterSubscriptionForm = this.formBuilder.group({
    email: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.newsletterSubscriptionForm.get('email')?.setValue(this.isEdit ? this.newsletterSubscription!.email : '');
    this.setupActionListeners();
  }

  close(): void {
    this.activeModal.close();
  }

  onSubmit() {
    if (this.newsletterSubscriptionForm.invalid) {
      return;
    }

    const newsletterSubscriptionDTO: NewsletterSubscriptionDTO = {
      email: this.newsletterSubscriptionForm.controls['email'].value!,
    };

    if (this.isEdit) {
      newsletterSubscriptionDTO.id = this.newsletterSubscription!.id;
      this.store.dispatch(new newsletterActions.EditNewsletterSubscription(newsletterSubscriptionDTO));
    } else {
      this.store.dispatch(new newsletterActions.AddNewsletterSubscription(newsletterSubscriptionDTO));
    }
  }

  private actionListenerCallback(action: any, callback: (payload: any) => void): void {
    this.actions$
      .pipe(ofActionSuccessful(action), takeUntil(this.unsubscribe$))
      .subscribe(({ payload }) => callback(payload));
  }

  private setupActionListeners(): void {
    this.actionListenerCallback(
      newsletterActions.AddNewsletterSubscription,
      this.addNewsLetterSubscriptionSuccess.bind(this)
    );
    this.actionListenerCallback(
      newsletterActions.EditNewsletterSubscription,
      this.editNewsLetterSubscriptionSuccess.bind(this)
    );
  }

  private addNewsLetterSubscriptionSuccess(): void {
    this.close();
  }

  private editNewsLetterSubscriptionSuccess(): void {
    this.close();
  }
}
