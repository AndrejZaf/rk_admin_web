import { Injectable } from '@angular/core';
import { Sneaker } from '../models/sneaker.model';
import { HttpClient } from '@angular/common/http';

interface ISneakerService {
  addSneaker(sneakerDTO: Sneaker): void;
}

@Injectable({
  providedIn: 'root',
})
export class SneakerService implements ISneakerService {
  constructor(private http: HttpClient) {}
  addSneaker(sneakerDTO: Sneaker): void {
    this.http.post('http://localhost:8080/api/sneaker', JSON.stringify(sneakerDTO)).subscribe((e) => console.log(e));
  }
}
