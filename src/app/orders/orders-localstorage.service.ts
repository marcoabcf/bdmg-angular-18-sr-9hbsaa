import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Order } from "./orders.model";

@Injectable({
  providedIn: "root",
})
export class OrderLocalStorageService {
  private keyLocalStorage = "orders";

  constructor() {}

  private getOrdersLocalStorage(): Order[] {
    const orders = localStorage.getItem(this.keyLocalStorage);
    return orders ? JSON.parse(orders) : [];
  }

  private saveOrders(orders: Order[]): void {
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(orders));
  }

  createOrder(order: Order): Observable<Order> {
    const orders = this.getOrdersLocalStorage();
    orders.push(order);
    this.saveOrders(orders);
    return of(order);
  }

  clearOrders(): void {
    localStorage.removeItem(this.keyLocalStorage);
  }

  getOrders(): Observable<Order[]> {
    return of(this.getOrdersLocalStorage());
  }
}
