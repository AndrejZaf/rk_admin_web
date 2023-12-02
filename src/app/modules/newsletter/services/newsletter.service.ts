import { Injectable } from '@angular/core';
import { NewsletterSubscriptionDTO } from './../dtos/newsletter-subscription.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface INewsletterService {
  addNewsletterSubscription(
    newsletterSubscriptionDTO: NewsletterSubscriptionDTO
  ): Observable<NewsletterSubscriptionDTO>;
  editNewsletterSubscription(
    newsletterSubscriptionDTO: NewsletterSubscriptionDTO
  ): Observable<NewsletterSubscriptionDTO>;
  loadNewsletterSubscriptions(): Observable<NewsletterSubscriptionDTO[]>;
  deleteNewsletterSubscription(id: number): Observable<void>;
}

@Injectable({
  providedIn: 'root',
})
export class NewsletterService implements INewsletterService {
  constructor(private http: HttpClient) {}

  addNewsletterSubscription(
    newsletterSubscriptionDTO: NewsletterSubscriptionDTO
  ): Observable<NewsletterSubscriptionDTO> {
    return this.http.post<NewsletterSubscriptionDTO>(
      'http://localhost:8080/api/admin/newsletter',
      JSON.stringify(newsletterSubscriptionDTO),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  editNewsletterSubscription(
    newsletterSubscriptionDTO: NewsletterSubscriptionDTO
  ): Observable<NewsletterSubscriptionDTO> {
    return this.http.put<NewsletterSubscriptionDTO>(
      'http://localhost:8080/api/admin/newsletter',
      JSON.stringify(newsletterSubscriptionDTO),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
  }

  loadNewsletterSubscriptions(): Observable<NewsletterSubscriptionDTO[]> {
    return this.http.get<NewsletterSubscriptionDTO[]>('http://localhost:8080/api/admin/newsletter');
  }

  deleteNewsletterSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/admin/newsletter?id=${id}`);
  }
}
