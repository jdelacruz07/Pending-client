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
  error: any = false;

  constructor(private appService: AppService, private router: Router) {
  }


  login() {
    this.appService.authenticate(this.credentials).subscribe((response: any) => {
      console.log("Respuesta a la autheticacion ", response)
      if (response.principal.username) {
        this.appService.authenticated = true;
      } else {
        this.appService.authenticated = false;
      }
      this.router.navigateByUrl('/');
    }, error => {
      console.log(error)
      this.error = true
    });
  }

}
