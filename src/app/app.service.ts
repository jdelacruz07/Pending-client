import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    authenticated = false;
    headers: any;
    username: string | undefined;

    constructor(private http: HttpClient) {
    }


    authenticate(credentials: { username: string; password: string; } | undefined) {
        this.username = credentials?.username;
        this.headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {})

        return this.http.get('http://localhost:8080/security/user');
    }

}
