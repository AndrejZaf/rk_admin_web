import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SneakerDTO } from '../dto/sneaker.dto';

@Injectable({
  providedIn: 'root',
})
export class SneakerService {
  constructor(private http: HttpClient) {}

  getPremiumSneaker(): Observable<SneakerDTO> {
    return this.http.get<SneakerDTO>('http://localhost:8080/api/inventory/sneaker/premium');
  }
}
