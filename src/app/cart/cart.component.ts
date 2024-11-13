import { CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Router, RouterLink } from "@angular/router";
import { Product } from "../products/products.model";
import { ProductService } from "../products/products.service";
import { SnackbarService } from "../shared/components/snackbar/snackbar.service";
import { CartService } from "./cart.service";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    CurrencyPipe,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
  total: number = 0;
  cartItems: Product[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private snackBar: SnackbarService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.productService.loadProducts();
    this.snackBar.success("O carrinho foi limpo!");
  }

  removeFromCart(product: Product): void {
    this.cartService.remove(product);
    this.productService.handleAddToCartProduct(product);
    this.snackBar.success("Produto removido do carrinho!");
  }

  redirectToCheckout(): void {
    this.router.navigate(["/checkout"]);
  }
}
