import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from "@angular/material/snack-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterModule } from "@angular/router";
import { HelloComponent } from "./hello.component";
import { LoaderComponent } from "./shared/components/loading/loader.component";
import { LoaderInterceptor } from "./shared/components/loading/loader.interceptor";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterModule,
    HelloComponent,
    MatButtonModule,
    LoaderComponent,
    MatToolbarModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 500,
        horizontalPosition: "right",
        verticalPosition: "top",
      },
    },
  ],
  template: `
    <div style="padding: 8px">
      <h1>Teste técnico</h1>
      <app-hello></app-hello>
    </div>

    <mat-toolbar class="custom-toolbar" color="primary">
      <mat-toolbar-row>
        <span>E-Commerce</span>
        <span class="spacer"></span>
        <nav>
          <a mat-button routerLink="/products">Products</a>
          <a mat-button routerLink="/cart">Cart</a>
          <a mat-button routerLink="/checkout">Checkout</a>
          <a mat-button routerLink="/orders">Orders</a>
        </nav>
      </mat-toolbar-row>
    </mat-toolbar>

    <div class="content">
      <loader></loader>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .custom-toolbar {
        background-color: #1e88e5;
        color: white;
        margin-top: 16px;
      }

      .spacer {
        flex: 1 1 auto;
      }

      .content {
        padding: 24px;
      }

      nav a {
        color: white;
        text-decoration: none;
      }
    `,
  ],
})
export class AppComponent {
  constructor() {}
}
