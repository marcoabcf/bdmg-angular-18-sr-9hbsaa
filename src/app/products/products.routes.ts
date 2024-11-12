import { RouterModule, Routes } from "@angular/router";

import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent,
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
