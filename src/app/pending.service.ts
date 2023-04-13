import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pending } from './pending';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class PendingService {

  pendingsUrl = 'http://localhost:8181/api/pending';  // URL to web api

  constructor(private http: HttpClient, private app: AppService) { }

  getPendingHistory(id: String): Observable<Pending> {
    let url = `${this.pendingsUrl}/history/${id}`
    return this.http.get<Pending>(url, { headers: this.app.headers })
  }


  getPendings() {
    return this.http.get(this.pendingsUrl, { headers: this.app.headers })
  }

  getPending(id: any): Observable<Pending> {
    let url = `${this.pendingsUrl}/${id}`
    return this.http.get<Pending>(url, { headers: this.app.headers })
  }

  add(pending: Pending): Observable<any> {
    return this.http.post(this.pendingsUrl, pending, { headers: this.app.headers })
  }

  update(pending: Pending): Observable<any> {
    return this.http.put<Pending>(this.pendingsUrl, pending, { headers: this.app.headers })
  }

  delete(id: String): Observable<any> {
    let url = `${this.pendingsUrl}/${id}`
    return this.http.delete(url, { headers: this.app.headers })
  }


}
