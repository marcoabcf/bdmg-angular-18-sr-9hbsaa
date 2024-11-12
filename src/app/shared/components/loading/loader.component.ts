import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { NgxLoadingModule } from "ngx-loading";
import { Subject } from "rxjs";
import { LoaderService } from "./loader.service";

@Component({
  standalone: true,
  selector: "loader",
  imports: [AsyncPipe, NgxLoadingModule],
  template: '<ngx-loading [show]="(loading | async) || false"></ngx-loading>',
})
export class LoaderComponent {
  public loading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService) {}
}
