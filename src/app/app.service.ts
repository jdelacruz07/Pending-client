import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    authenticated = false;
    headers: any;
    username = "";

    constructor(private http: HttpClient) {
    }

    authenticate(credentials: { username: any; password: any; } | undefined) {
        console.log("Estas en el servicio ")
        this.username = credentials?.username;
        this.headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        return this.http.get('http://localhost:8181/security/user', { headers: this.headers });

    }
}
