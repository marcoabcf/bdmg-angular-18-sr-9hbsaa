import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, of } from "rxjs";
import { Product } from "./products.model";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private productsSubject = new BehaviorSubject<Product[]>([]);

  private apiUrl = "https://fakestoreapi.com/products";

  constructor(private http: HttpClient) {}

  loadProducts(): void {
    const products = this.http
      .get<Product[]>(this.apiUrl)
      .pipe(map((product) => product));

    products.subscribe((items) => {
      this.updateProductList(items);
    });
  }

  getProducts() {
    return this.productsSubject.asObservable();
  }

  updateProductList(products: Product[]) {
    this.productsSubject.next(products);
  }

  handleAddToCartProduct(product: Product): Product {
    const products = this.productsSubject.getValue();

    let index = products.indexOf(product);
    product.addedToCart = !product.addedToCart;

    products[index] = product;
    this.updateProductList(products);

    return product;
  }
}
