import { CurrencyPipe, NgFor, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatGridListModule } from "@angular/material/grid-list";
import { Router, RouterLink } from "@angular/router";
import { v4 as uuidv4 } from "uuid";
import { CartService } from "../cart/cart.service";
import { Product } from "../products/products.model";
import { CheckoutValidator } from "./checkout.validator";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { OrderLocalStorageService } from "../orders/orders-localstorage.service";
import { Order } from "../orders/orders.model";
import { SnackbarService } from "../shared/components/snackbar/snackbar.service";
import { ViaCepService } from "../shared/services/viacep.service";

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    CurrencyPipe,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent implements OnInit {
  form!: FormGroup;
  total: number = 0;
  cartItems: Product[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private snackBar: SnackbarService,
    private viaCepService: ViaCepService,
    private orderService: OrderLocalStorageService
  ) {}

  ngOnInit() {
    this.loadCheckout();
    this.form = this.formBuilder.group(CheckoutValidator);
  }

  loadCheckout(): void {
    this.cartService.getItems().subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  redirectToCart(): void {
    this.router.navigate(["/cart"]);
  }

  findAddress() {
    const cep = this.form.get("cep")?.value;
    if (cep && cep.length === 8) {
      this.viaCepService.getAddress(cep).subscribe({
        next: (data) => {
          if (data.erro) {
            this.snackBar.error("CEP não encontrado.");
            return;
          }

          this.form.patchValue({
            place: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          });
        },
        error: (error) => {
          console.error("Erro ao buscar o CEP:", error);
          this.snackBar.error("Erro ao buscar o CEP.");
        },
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const order: Order = {
        orderId: uuidv4(),
        total: this.total,
        items: this.cartItems,
        userData: this.form.value,
      };

      this.orderService.createOrder(order).subscribe(() => {
        this.form.reset();
        this.cartService.clearCart();
        this.snackBar.success("Pedido realizado com sucesso!");
        this.router.navigate(["/orders"]);
      });
    }
  }
}
