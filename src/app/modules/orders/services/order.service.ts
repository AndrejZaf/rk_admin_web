import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from '../dto/order.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  loadOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${environment.apiUrl}/api/orders`);
  }
}
