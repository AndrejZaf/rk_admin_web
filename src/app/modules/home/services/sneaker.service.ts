import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../dto/sneaker.dto';
import { SaleDTO } from '../dto/sale.dto';

@Injectable({
  providedIn: 'root',
})
export class SneakerService {
  constructor(private http: HttpClient) {}

  getPremiumSneaker(): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>('http://localhost:8080/api/inventory/sneakers/premium');
  }

  getPopularSneaker(): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>('http://localhost:8080/api/inventory/sneakers/popular');
  }

  getSneakerSaleStats(): Observable<SaleDTO[]> {
    return this.http.get<SaleDTO[]>('http://localhost:8080/api/orders/statistics');
  }
}
