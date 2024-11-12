import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  error(message: string) {
    return this.snackBar.open(message, undefined, {
      panelClass: "snackbar-error",
    });
  }

  success(message: string) {
    return this.snackBar.open(message, undefined, {
      panelClass: "snackbar-success",
    });
  }

  info(message: string) {
    return this.snackBar.open(message, undefined, {
      panelClass: "snackbar-info",
    });
  }
}
