import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { CartService } from "./cart.service";
import { ProductService } from "../products/products.service";
import { SnackbarService } from "../shared/components/snackbar/snackbar.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

class MockCartService {
  getItems() {
    return of([{ title: "Produto 1", price: 100, image: "imagem1.png" }]);
  }

  getTotalPrice() {
    return 100;
  }

  clearCart() {}
  remove(product: any) {}
}

class MockProductService {
  loadProducts() {}
  handleAddToCartProduct(product: any) {}
}

class MockSnackbarService {
  success(message: string) {}
}

class MockRouter {
  navigate(path: string[]) {}
}

describe("CartComponent", () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: MockCartService;
  let productService: MockProductService;
  let snackBar: MockSnackbarService;
  let router: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent, MatButtonModule, MatCardModule],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: ProductService, useClass: MockProductService },
        { provide: SnackbarService, useClass: MockSnackbarService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    productService = TestBed.inject(ProductService);
    snackBar = TestBed.inject(SnackbarService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve exibir os itens do carrinho", () => {
    component.cartItems = [
      {
        id: 1,
        title: "Produto 1",
        price: 50,
        description: "Produto 1 é o mais bonito",
        image: "",
      },
    ];
    fixture.detectChanges();

    const itemTitle = fixture.nativeElement.querySelector(".cart-item h3");
    expect(itemTitle.textContent).toContain("Produto 1");
  });

  it("deve chamar o método clearCart ao limpar o carrinho", () => {
    spyOn(cartService, "clearCart");
    spyOn(snackBar, "success");

    component.clearCart();

    expect(cartService.clearCart).toHaveBeenCalled();
    expect(snackBar.success).toHaveBeenCalledWith("O carrinho foi limpo!");
  });

  it("deve chamar o método removeFromCart ao remover um item", () => {
    const produto = {
      id: 1,
      title: "Produto 1",
      price: 50,
      description: "Produto 1 é o mais bonito",
      image: "",
    };
    spyOn(cartService, "remove");
    spyOn(productService, "handleAddToCartProduct");
    spyOn(snackBar, "success");

    component.removeFromCart(produto);

    expect(cartService.remove).toHaveBeenCalledWith(produto);
    expect(productService.handleAddToCartProduct).toHaveBeenCalledWith(produto);
    expect(snackBar.success).toHaveBeenCalledWith(
      "Produto removido do carrinho!"
    );
  });
});
