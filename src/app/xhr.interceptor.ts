import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  header = this.appService.headers;

  constructor(private appService: AppService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: this.appService.headers,
      setHeaders: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    return next.handle(xhr);
  }

}
