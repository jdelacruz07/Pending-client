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


  constructor(private appService: AppService, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.http.get('http://localhost:8181/security/resource', { headers: this.appService.headers }).subscribe(data => {
      this.greeting = data
    }, error => console.log(error)
    )
  }


  authenticated() {
    if (this.appService.authenticated) {
      return true;
    } else {
      return false
    }
  }

}
