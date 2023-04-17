import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pending } from './pending';
import { AppService } from './app.service';


@Injectable({
  providedIn: 'root'
})
export class PendingService {

  pendingsUrl = 'http://localhost:8181/api/pending';


  constructor(private http: HttpClient, private app: AppService) { }


  getPendingHistory(id: string | null): Observable<Pending> {
    let url = `${this.pendingsUrl}/history/${id}`
    return this.http.get<Pending>(url)
  }



  getPendings() {
    return this.http.get(this.pendingsUrl)
  }


  getPending(id: string): Observable<Pending> {
    let url = `${this.pendingsUrl}/${id}`
    return this.http.get<Pending>(url)
  }


  add(pending: Pending): Observable<any> {
    return this.http.post(this.pendingsUrl, pending)
  }


  update(pending: Pending): Observable<any> {
    return this.http.put<Pending>(this.pendingsUrl, pending)
  }


  delete(id: string | null): Observable<any> {
    let url = `${this.pendingsUrl}/${id}`
    return this.http.delete(url)
  }

}
