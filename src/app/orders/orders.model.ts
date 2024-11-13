import { Checkout, UserData } from "../checkout/checkout.model";
import { Product } from "../products/products.model";

export class Order extends Checkout {
  orderId: string;

  constructor(
    total: number,
    orderId: string,
    items: Product[],
    userData?: UserData
  ) {
    super(total, items, userData);

    this.orderId = orderId;
  }
}
