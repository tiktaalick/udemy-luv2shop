import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private purchaseUrl: string = environment.luv2shopApiUrl + '/checkout/purchase';

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<Purchase> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase)
  }
}
