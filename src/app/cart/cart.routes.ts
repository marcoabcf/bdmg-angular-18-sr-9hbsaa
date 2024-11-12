import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";

const routes: Routes = [
  {
    path: "cart",
    component: CartComponent,
  },
  // {
  //   path: 'add',
  //   component: SurvivorCreateComponent
  // },
  // {
  //   path: ':id/details',
  //   component: SurvivorDetailsComponent
  // },
  // {
  //   path: ':id/inventory',
  //   component: SurvivorInventoryComponent,
  //   children: [
  //     {
  //       path: ':id/trade',
  //       component: SurvivorInventoryComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProductsRoutes {}
