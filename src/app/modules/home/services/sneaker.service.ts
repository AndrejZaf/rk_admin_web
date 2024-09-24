import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../dto/sneaker.dto';
import { SaleDTO } from '../dto/sale.dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SneakerService {
  constructor(private http: HttpClient) {}

  getPremiumSneaker(): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>(`${environment.apiUrl}/api/inventory/sneakers/premium`);
  }

  getPopularSneaker(): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>(`${environment.apiUrl}/api/inventory/sneakers/popular`);
  }

  getSneakerSaleStats(): Observable<SaleDTO[]> {
    return this.http.get<SaleDTO[]>(`${environment.apiUrl}/api/orders/statistics`);
  }
}
