import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PendingService {
  url = environment.url;

  constructor(private http: HttpClient) { }

  public addImage(newImage: File) {
    console.log("Desde service addImage ", newImage);
    const formData = new FormData();
    formData.append('file', newImage);

    return this.http.post(this.url + "/upload", formData)
      .pipe(
        catchError(async (error: HttpErrorResponse) => {
          console.log("Error en el upload ", error.error);
        })
      );
  }

  public deletePending(pending: Pending) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete(`${this.url}/${pending.id}`, httpOptions)
  }


  public getPending() {
    return this.http.get(this.url);
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