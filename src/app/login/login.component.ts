import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { username: '', password: '' };

  constructor(private app: AppService, private http: HttpClient, private router: Router) {
  }

  login() {
    this.app.authenticate(this.credentials).subscribe((response: any) => {
      console.log("Esta es la respuesta al servicio", response)
      if (response.principal.username) {
        this.app.authenticated = true;
      } else {
        this.app.authenticated = false;
      }
      console.log("En el login ", this.app.authenticated)
      this.router.navigateByUrl('/pending');
    });
  }
}