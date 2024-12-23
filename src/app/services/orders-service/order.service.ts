import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order';
import { AddOrder } from '../../models/addOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  get_orders_by_user(firstName: string, lastName: string) : Observable<Order[]>{
    return this.httpClient.get<Order[]>(`http://localhost:5090/api/Orders/Get-Orders-By-User?firstname=${firstName}&lastname=${lastName}`)
  }

  add_order(addOrder: AddOrder){
    return this.httpClient.post<any>("http://localhost:5090/api/Orders/Add-Order",addOrder)
  }
}
