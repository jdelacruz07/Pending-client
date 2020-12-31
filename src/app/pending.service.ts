import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PendingService {

  constructor(private http: HttpClient) { }
  
  public getPending() {
    return  this.http.get("http://localhost:8080/api");
  }
  
  public addPending(pending: Pending) {
    console.log("Desde service Post ", pending);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post("http://localhost:8080/api", pending, httpOptions)
  }
  
}

export interface Pending {
  id: String;
  pending: String;
}