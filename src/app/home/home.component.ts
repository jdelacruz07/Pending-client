import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  title = 'Demo';
  greeting: any = { id: "", content: "" };


  constructor(private app: AppService, private http: HttpClient) {
  }

  ngOnInit(): void {
    console.log("Compnenet casa ", this.app.headers)
    this.http.get('http://localhost:8181/security/resource', { headers: this.app.headers }).subscribe(data => {
      this.greeting = data
    })
  }

  authenticated() {
    if (this.app.authenticated) {
      return true;
    } else {
      return false
    }
  }


}
