import { CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";
import { RouterLink } from "@angular/router";
import { OrderLocalStorageService } from "./orders-localstorage.service";
import { Order } from "./orders.model";

@Component({
  selector: "app-orders",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
  ],
  templateUrl: "./orders.component.html",
  styleUrl: "./orders.component.scss",
})
export class OrdersComponent {
  orders: Order[] = [];
  displayedColumns: string[] = ["orderId", "fullName", "total", "date"];

  constructor(private orderLocalStorageService: OrderLocalStorageService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderLocalStorageService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
}
