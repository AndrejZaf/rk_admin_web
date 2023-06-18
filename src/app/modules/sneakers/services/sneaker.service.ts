import { Injectable } from '@angular/core';
import { SneakerDTO } from '../dto/sneaker.dto';
import { HttpClient } from '@angular/common/http';
import { BrandDTO } from '../dto/brand.dto';
import { Observable } from 'rxjs';

interface ISneakerService {
  addSneaker(sneakerDTO: SneakerDTO): Observable<SneakerDTO>;
  editSneaker(sneakerDTO: SneakerDTO): Observable<SneakerDTO>;
  loadBrands(): Observable<BrandDTO[]>;
  loadSneakers(): Observable<SneakerDTO[]>;
}

@Injectable({
  providedIn: 'root',
})
export class SneakerService implements ISneakerService {
  constructor(private http: HttpClient) {}

  loadSneakers(): Observable<SneakerDTO[]> {
    return this.http.get<SneakerDTO[]>('http://localhost:8080/api/admin/sneaker');
  }

  addSneaker(sneakerDTO: SneakerDTO): Observable<SneakerDTO> {
    return this.http.post<SneakerDTO>('http://localhost:8080/api/admin/sneaker', JSON.stringify(sneakerDTO), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  editSneaker(sneakerDTO: SneakerDTO): Observable<SneakerDTO> {
    return this.http.put<SneakerDTO>('http://localhost:8080/api/admin/sneaker', JSON.stringify(sneakerDTO), {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  loadBrands(): Observable<BrandDTO[]> {
    return this.http.get<BrandDTO[]>('http://localhost:8080/api/admin/brand');
  }
}
