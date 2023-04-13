import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pending } from '../pending';
import { PendingService } from '../pending.service';

@Component({
  selector: 'app-detail-pending',
  templateUrl: './detail-pending.component.html',
  styleUrls: ['./detail-pending.component.css'],
})
export class DetailPendingComponent implements OnInit {
  pending: Pending = {
    id: "", username: "", topic: "", dateSelected: new Date(), reference: null
  };
  pendingHistory: Pending[] = [{
    id: "", username: "", topic: "", dateSelected: new Date(), reference: null
  }];
  isUpdate: boolean = false;
  isHistory: boolean = false;

  constructor(private activatesRoute: ActivatedRoute, private pendingService: PendingService, private router: Router) { }

  ngOnInit() {
    this.getPending();
  }


  getPendingHistory(id: String) {
    this.pendingService.getPendingHistory(id).subscribe(history => {
      let pendingHistory: any = history
      this.pendingHistory = pendingHistory;
      if (this.pendingHistory.length > 0) {
        this.isHistory = true;
      }
    });
  }


  getPending() {
    let id: string = this.activatesRoute.snapshot.params['id'];
    this.pendingService.getPending(id).subscribe(pending => {
      this.pending = pending
      this.getPendingHistory(pending.id);
    });
  }


  updatePending(updateTopic: any) {
    this.pending.topic = updateTopic;
    this.pending.dateSelected = new Date();
    this.pendingService.update(this.pending).subscribe(() => {
      this.isUpdate ? (this.isUpdate = false) : (this.isUpdate = true);
      this.router.navigate(['',]);
    })
  }


  delete(pending: Pending) {
    this.pendingService.delete(pending.id).subscribe(() => this.router.navigate(['',]));
  }

}

