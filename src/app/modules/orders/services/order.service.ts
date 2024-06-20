import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from '../dto/order.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  loadOrders(): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>('http://localhost:8080/api/orders');
  }
}
