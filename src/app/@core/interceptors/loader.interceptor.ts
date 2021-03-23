import { Injectable, Injector, OnInit } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { LoaderOverlayService } from "../services/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private readonly loaderService: LoaderOverlayService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const spinnerSubscription: Subscription = this.loaderService.spinner.subscribe();
    return next.handle(req).pipe(
      finalize(() => spinnerSubscription.unsubscribe()));
  }
}
