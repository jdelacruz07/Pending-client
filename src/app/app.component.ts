import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pending-client';
  pending: string = '';
  pendents: string[] = [];

  addPending(pending: string) {
    console.log(pending);
    this.pendents.push(pending);
    this.pending = '';

  }

}
