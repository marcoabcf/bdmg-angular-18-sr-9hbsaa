import { Validators } from "@angular/forms";

export const CheckoutValidator = {
  fullName: ["", [Validators.required]],
  email: ["", [Validators.required, Validators.email]],
  phone: [
    "",
    [Validators.required, Validators.minLength(10), Validators.maxLength(11)],
  ],
  cep: [
    "",
    [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
  ],
  place: ["", [Validators.required]],
  neighborhood: ["", [Validators.required]],
  city: ["", [Validators.required]],
  state: ["", [Validators.required]],
  number: [""],
  complement: [""],
};
