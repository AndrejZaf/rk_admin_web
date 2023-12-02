import { HttpErrorResponse } from '@angular/common/http';
import { NewsletterSubscriptionDTO } from '../dtos/newsletter-subscription.dto';

export class LoadNewsletterSubscriptions {
  static readonly type = '[Newsletter] Load Newsletter Subscriptions';
}

export class LoadNewsletterSubscriptionsSuccess {
  static readonly type = '[Newsletter] Load Newsletter Subscriptions Success';
  constructor(readonly payload: NewsletterSubscriptionDTO[]) {}
}

export class LoadNewsletterSubscriptionsFail {
  static readonly type = '[Newsletter] Load Newsletter Subscriptions Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class AddNewsletterSubscription {
  static readonly type = '[Newsletter] Add Newsletter Subscriptions';
  constructor(readonly payload: NewsletterSubscriptionDTO) {}
}

export class AddNewsletterSubscriptionSuccess {
  static readonly type = '[Newsletter] Add Newsletter Subscriptions Success';
  constructor(readonly payload: NewsletterSubscriptionDTO) {}
}

export class AddNewsletterSubscriptionFail {
  static readonly type = '[Newsletter] Add Newsletter Subscriptions Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class EditNewsletterSubscription {
  static readonly type = '[Newsletter] Edit Newsletter Subscriptions';
  constructor(readonly payload: NewsletterSubscriptionDTO) {}
}

export class EditNewsletterSubscriptionSuccess {
  static readonly type = '[Newsletter] Edit Newsletter Subscriptions Success';
  constructor(readonly payload: NewsletterSubscriptionDTO) {}
}

export class EditNewsletterSubscriptionFail {
  static readonly type = '[Newsletter] Edit Newsletter Subscriptions Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}

export class DeleteNewsletterSubscription {
  static readonly type = '[Newsletter] Delete Newsletter Subscriptions';
  constructor(readonly payload: number) {}
}

export class DeleteNewsletterSubscriptionSuccess {
  static readonly type = '[Newsletter] Delete Newsletter Subscriptions Success';
  constructor(readonly payload: number) {}
}

export class DeleteNewsletterSubscriptionFail {
  static readonly type = '[Newsletter] Delete Newsletter Subscriptions Fail';
  constructor(readonly payload: HttpErrorResponse) {}
}
