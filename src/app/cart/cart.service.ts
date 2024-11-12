import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "../products/products.model";
import { SnackbarService } from "../shared/components/snackbar/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private products: Product[] = [];
  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  constructor(private snackBar: SnackbarService) {}

  add(product: Product) {
    const productExists = this.products.some((item) => item.id === product.id);

    if (productExists) {
      this.snackBar.error("Produto já adicionado ao carrinho!");
      return;
    }

    this.products.push(product);
    this.productsSubject.next(this.products);
    this.snackBar.success("Produto adicionado ao carrinho!");
  }

  remove(product: Product) {
    this.products = this.products.filter((item) => item.id !== product.id);
    this.productsSubject.next(this.products);
    this.snackBar.success("Produto removido do carrinho!");
  }

  clearCart() {
    this.products = [];
    this.productsSubject.next(this.products);
    this.snackBar.success("O carrinho foi limpo!");
  }

  getItems() {
    return this.productsSubject.asObservable();
  }

  getTotalPrice(): number {
    return this.products.reduce((total, item) => total + item.price, 0);
  }
}
