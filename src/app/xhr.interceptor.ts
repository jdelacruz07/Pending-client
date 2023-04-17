import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';


@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  header = this.app.headers;

  constructor(private app: AppService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: this.app.headers,
      setHeaders: { 'X-Requested-With': 'XMLHttpRequest' }
    })
    return next.handle(xhr);
  }

}
