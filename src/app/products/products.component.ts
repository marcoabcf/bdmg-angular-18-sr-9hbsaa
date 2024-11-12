import { DecimalPipe, NgFor } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CartComponent } from "../cart/cart.component";
import { CartService } from "../cart/cart.service";
import { Product } from "./products.model";
import { ProductService } from "./products.service";

@Component({
  selector: "app-products",
  standalone: true,
  imports: [NgFor, DecimalPipe, CartComponent],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((items) => {
      this.products = items;
    });

    if (this.products.length === 0) {
      this.productService.loadProducts();
    }
  }

  addProductToCart(product: Product): void {
    const addedProduct = this.productService.handleAddToCartProduct(product);
    this.cartService.add(addedProduct);
  }

  removeProductToCart(product: Product): void {
    const removedProduct = this.productService.handleAddToCartProduct(product);
    this.cartService.remove(removedProduct);
  }
}
