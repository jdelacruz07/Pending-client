import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = "Probando App "

  constructor(private appService: AppService, private http: HttpClient, private router: Router) {
  }


  ngOnInit(): void {
    this.appService.authenticate(undefined).subscribe(response => { console.log("Autenticar " + response) }, error => console.log(error));
  }


  logout() {
    this.http.post('logout', {}).subscribe(() => {
      console.log("Entras al logout ")
      this.appService.authenticated = false;
      this.router.navigateByUrl('/login');
    });
  }

}
