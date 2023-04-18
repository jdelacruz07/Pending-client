import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pending } from '../pending';
import { PendingService } from '../pending.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-pending',
  templateUrl: './detail-pending.component.html',
  styleUrls: ['./detail-pending.component.css'],
})
export class DetailPendingComponent implements OnInit {
  pending: Pending = {
    id: null, username: '', topic: '', dateSelected: new Date(), reference: null
  };
  pendingHistory: Pending[] = [];
  isUpdate: boolean = false;
  isHistory: boolean = false;
  checkoutForm: any;

  constructor(private activatesRoute: ActivatedRoute, private pendingService: PendingService, private router: Router, private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    this.getPending();
  }


  getPending() {
    let id: string = this.activatesRoute.snapshot.params['id'];
    this.pendingService.getPending(id).subscribe(pending => {
      this.pending = pending
      this.getPendingHistory(pending.id);
      this.checkoutForm = this.formBuilder.group({ topic: this.pending.topic, dateSelected: new Date() });
    }, error => console.log(error));
  }


  getPendingHistory(id: string | null) {
    this.pendingService.getPendingHistory(id).subscribe(history => {
      let pendingHistory: any = history
      this.pendingHistory = pendingHistory;
      if (this.pendingHistory.length > 0) {
        this.isHistory = true;
      }
    }, error => console.log(error));
  }


  updatePending(updateForm: any) {
    if (this.pending.topic == updateForm.topic) {
      this.router.navigate(['',]);
    } else {
      this.pending.topic = updateForm.topic;
      this.pending.dateSelected = new Date();
      this.pendingService.updatePending(this.pending).subscribe(() => {
        this.isUpdate ? (this.isUpdate = false) : (this.isUpdate = true);
        this.router.navigate(['',]);
      }, error => console.log(error))
    }

  }


  deletePending(pending: Pending) {
    this.pendingService.deletePending(pending.id).subscribe(() => {
      this.router.navigate(['',])
    }, error => console.log(error));
  }

}

