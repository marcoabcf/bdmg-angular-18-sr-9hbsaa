import { CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Product } from "../products/products.model";
import { CartService } from "./cart.service";
import { ProductService } from "../products/products.service";

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe],
  templateUrl: "./cart.component.html",
  styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
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
  }

  removeFromCart(product: Product): void {
    this.cartService.remove(product);
    this.productService.handleAddToCartProduct(product);
  }
}
