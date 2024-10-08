import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private _loading: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this._loading.setLoading(true, request.url);
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this._loading.setLoading(false, request.url);
        }
      }),
      catchError((err) => {
        this._loading.setLoading(false, request.url);
        throw err;
      })
    );
  }
}
