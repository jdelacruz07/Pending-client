import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pending } from './pending';


@Injectable({
  providedIn: 'root'
})
export class PendingService {

  private pendingsUrl = 'http://localhost:8080/pendings';  // URL to web api

  // httpOptions: { headers?: HttpHeaders | { [header: string]: string | string[]; } | undefined; context?: HttpContext | undefined; observe?: "body" | undefined; params?: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined; reportProgress?: boolean | undefined; responseType: "arraybuffer"; withCredentials?: boolean | undefined; };
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPendings(): Observable<Pending[]> {
    return this.http.get<Pending[]>(this.pendingsUrl)
  }

  getPending(id: any): Observable<Pending> {
    let url = `${this.pendingsUrl}/${id}`
    return this.http.get<Pending>(url)
  }

  add(pending: Pending): Observable<any> {
    return this.http.post(this.pendingsUrl, pending, this.httpOptions)
  }

  update(pending: Pending): Observable<any> {
    return this.http.put<Pending>(this.pendingsUrl, pending, this.httpOptions)
  }

  delete(id: String): Observable<any> {
    let url = `${this.pendingsUrl}/${id}`
    return this.http.delete(url, this.httpOptions)
  }


}
