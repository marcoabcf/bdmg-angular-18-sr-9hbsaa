import { Product } from "../products/products.model";

export class UserData {
  fullName: string;
  email: string;
  phone: number;
  cep: number;
  place: string;
  neighborhood: string;
  city: string;
  state: string;
  complement?: string;
  number?: string;

  constructor(
    fullName: string,
    email: string,
    phone: number,
    cep: number,
    place: string,
    neighborhood: string,
    city: string,
    state: string,
    complement?: string,
    number?: string
  ) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.cep = cep;
    this.place = place;
    this.complement = complement;
    this.number = number;
    this.neighborhood = neighborhood;
    this.city = city;
    this.state = state;
  }
}

export class Checkout {
  total: number;
  items: Product[];
  userData?: UserData;

  constructor(total: number, items: Product[], userData?: UserData) {
    this.total = total;
    this.items = items;
    this.userData = userData;
  }
}
