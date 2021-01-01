import { Component } from '@angular/core';
import { Pending, PendingService } from './pending.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pending-client';
  pending: String = '';
  pendingEdit: String = '';
  pendingList: any;
  indexPending: number = -1;
  
  constructor(private pendingApi: PendingService) {
    
  }
  
  ngOnInit() {
    this.getPending();
  }
  
  updatePending(pending: Pending, pendingUpdate: String ) {
    console.log("Update id", pending.id, pendingUpdate);
    let updatePending: Pending = {id:"", pending:""};
    updatePending.id = pending.id;
    updatePending.pending = pendingUpdate;
    this.pendingApi.addPending(updatePending).subscribe(x => {
      this.pending = '';
      this.getPending();
      this.indexPending = -1;
    });
  }
  
  editPending(item: Pending, index: number) {
    console.log("edit item", item, index);
    this.pendingEdit = item.pending;
    this.indexPending = index;
  }
  
  addPending(pending: String) {
    console.log("Add pending ", pending);
    let newPending: Pending = {id:"", pending:""};
    newPending.pending = pending;
    this.pendingApi.addPending(newPending).subscribe(x => {
      this.pending = '';
      this.getPending();
    });
  }
  
  deletePending(item: Pending) {
    this.pendingApi.deletePending(item).subscribe(x => {
      this.getPending();
    });
  }
  
  getPending() {
    this.pendingApi.getPending().subscribe(x => {
    console.log(x)
    this.pendingList = x;
    });

  }


}
