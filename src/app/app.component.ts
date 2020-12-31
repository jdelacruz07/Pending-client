import { Component } from '@angular/core';
import { Pending, PendingService } from './pending.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pending-client';
  pending: string = '';
  pendingList: any;
  newPending: Pending = {id:"", pending:""};

  constructor(private pendingApi: PendingService) {
  
  }

  ngOnInit() {
    this.getPending();
  }

  addPending(pending: String) {
    console.log("pending ", pending);
    this.newPending.pending = pending;
    this.pendingApi.addPending(this.newPending).subscribe(x => {
      this.pending = '';
      this.getPending();
    });
  }
  
  deletePending(i: number) {
    console.log("index", i);
    this.pendingList.splice(i,1);
  }
  
  getPending() {
    this.pendingApi.getPending().subscribe(x => {
    console.log(x)
    this.pendingList = x;
    });

  }


}
