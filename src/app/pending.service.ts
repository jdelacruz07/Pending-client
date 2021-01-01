import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PendingService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  public deletePending(pending:Pending) {
    console.log("Desde service delete ", pending);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete(`${this.url}/${pending.id}`, httpOptions)
  }


  public getPending() {
    return  this.http.get(this.url);
  }
  
  public addPending(pending: Pending) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post(this.url, pending, httpOptions)
  }
  
}

export interface Pending {
  id: String;
  pending: String;
}