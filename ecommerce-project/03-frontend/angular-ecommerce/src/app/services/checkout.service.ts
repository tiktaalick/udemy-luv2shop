import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl: string = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<Purchase> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase)
  }
}
