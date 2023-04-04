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
    id: "", topic: "", dateSelected: new Date(), reference: ''
  };
  pendingHistory: Pending[] = [{
    id: "", topic: "", dateSelected: new Date(), reference: ''
  }];
  isUpdate: boolean = false;
  isHistory: boolean = false;

  constructor(
    private activatesRoute: ActivatedRoute,
    private pendingService: PendingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPending();
  }

  getPendingHistory(id: String) {
    this.pendingService.getPendingHistory(id).subscribe(history => {
      // console.log("Este es el historial ", history)
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
    let pendingHistory: Pending = { id: null, topic: this.pending.topic, dateSelected: new Date(), reference: this.pending.id }
    this.pending.topic = updateTopic;
    this.pending.dateSelected = new Date();
    this.pending.reference = "";
    this.pendingService.update(this.pending).subscribe(() => {
      this.addToHistory(pendingHistory)
    })
    this.isUpdate ? (this.isUpdate = false) : (this.isUpdate = true);
    this.router.navigate(['',]);
  }

  addToHistory(pendingHistory: Pending) {
    this.pendingService.add(pendingHistory).subscribe(() => console.log(`Se agrega pendiente con la referencia ${pendingHistory.reference}`));
  }

  delete(pending: Pending) {
    this.pendingService.delete(pending.id).subscribe(() => this.router.navigate(['',]));
    // pending.id = " "
    // this.pendingService.delete(pending.id).subscribe(() => this.router.navigate(['',]));

  }
}

