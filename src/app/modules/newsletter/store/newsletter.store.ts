import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import * as newsletterActions from './newsletter.actions';
import { Observable, catchError, from, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { insertItem, patch, removeItem, updateItem } from '@ngxs/store/operators';
import { NewsletterViewModel } from '../models/newsletter.view-model';
import { NewsletterSubscriptionDTO } from '../dtos/newsletter-subscription.dto';
import { NewsletterService } from '../services/newsletter.service';

export const newsletterState = (): NewsletterViewModel => ({
  newsletterSubscriptions: [],
});

@State<NewsletterViewModel>({
  name: 'newsletterState',
  defaults: newsletterState(),
})
@Injectable()
export class NewsletterState {
  @Selector()
  static newsletterSubscriptions(state: NewsletterViewModel): NewsletterSubscriptionDTO[] {
    return state.newsletterSubscriptions;
  }

  constructor(private newsletterService: NewsletterService) {}

  @Action(newsletterActions.LoadNewsletterSubscriptions)
  loadNewsletterSubscriptions({
    dispatch,
  }: StateContext<NewsletterViewModel>): Observable<void | NewsletterSubscriptionDTO[] | Observable<void>> {
    return from(this.newsletterService.loadNewsletterSubscriptions()).pipe(
      map((data: NewsletterSubscriptionDTO[]) =>
        dispatch(new newsletterActions.LoadNewsletterSubscriptionsSuccess(data))
      ),
      catchError((err: HttpErrorResponse) => dispatch(new newsletterActions.LoadNewsletterSubscriptionsFail(err)))
    );
  }

  @Action(newsletterActions.LoadNewsletterSubscriptionsSuccess)
  loadNewsletterSubscriptionsSuccess(
    { patchState }: StateContext<NewsletterViewModel>,
    { payload }: newsletterActions.LoadNewsletterSubscriptionsSuccess
  ): void {
    patchState({ newsletterSubscriptions: payload });
  }

  @Action(newsletterActions.AddNewsletterSubscription)
  addNewsletterSubscription(
    { dispatch }: StateContext<NewsletterViewModel>,
    { payload }: newsletterActions.AddNewsletterSubscription
  ): Observable<void | NewsletterSubscriptionDTO | Observable<void>> {
    return from(this.newsletterService.addNewsletterSubscription(payload)).pipe(
      map((data: NewsletterSubscriptionDTO) => dispatch(new newsletterActions.AddNewsletterSubscriptionSuccess(data))),
      catchError((err: HttpErrorResponse) => dispatch(new newsletterActions.AddNewsletterSubscriptionFail(err)))
    );
  }

  @Action(newsletterActions.AddNewsletterSubscriptionSuccess)
  addNewsletterSubscriptionSuccess(
    { setState, patchState }: StateContext<NewsletterViewModel>,
    { payload }: newsletterActions.AddNewsletterSubscriptionSuccess
  ): void {
    setState(
      patch({
        newsletterSubscriptions: insertItem(payload),
      })
    );
  }

  @Action(newsletterActions.EditNewsletterSubscription)
  editNewsletterSubscription(
    { dispatch }: StateContext<NewsletterViewModel>,
    { payload }: newsletterActions.EditNewsletterSubscription
  ): Observable<void | NewsletterSubscriptionDTO | Observable<void>> {
    return from(this.newsletterService.editNewsletterSubscription(payload)).pipe(
      map((data: NewsletterSubscriptionDTO) => dispatch(new newsletterActions.EditNewsletterSubscriptionSuccess(data))),
      catchError((err: HttpErrorResponse) => dispatch(new newsletterActions.EditNewsletterSubscriptionFail(err)))
    );
  }

  @Action(newsletterActions.EditNewsletterSubscriptionSuccess)
  editNewsletterSubscriptionSuccess(
    { setState }: StateContext<NewsletterViewModel>,
    { payload }: newsletterActions.EditNewsletterSubscriptionSuccess
  ): void {
    setState(
      patch({
        newsletterSubscriptions: updateItem(
          (newsletterSubscription) => newsletterSubscription.id === payload.id,
          patch(payload)
        ),
      })
    );
  }

  @Action(newsletterActions.DeleteNewsletterSubscription)
  deleteNewsletterSubscription(
    { dispatch }: StateContext<NewsletterViewModel>,
    { payload }: newsletterActions.DeleteNewsletterSubscription
  ): Observable<void | NewsletterSubscriptionDTO | Observable<void>> {
    return from(this.newsletterService.deleteNewsletterSubscription(payload)).pipe(
      map((_) => dispatch(new newsletterActions.DeleteNewsletterSubscriptionSuccess(payload))),
      catchError((err: HttpErrorResponse) => dispatch(new newsletterActions.DeleteNewsletterSubscriptionFail(err)))
    );
  }

  @Action(newsletterActions.DeleteNewsletterSubscriptionSuccess)
  deleteNewsletterSubscriptionSuccess(
    { setState }: StateContext<NewsletterViewModel>,
    { payload }: newsletterActions.DeleteNewsletterSubscriptionSuccess
  ): void {
    setState(
      patch({
        newsletterSubscriptions: removeItem((newsletterSubscription) => newsletterSubscription.id === payload),
      })
    );
  }
}
