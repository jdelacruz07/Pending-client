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
  pending: Pending = { id: "", topic: "", dateSelected: new Date()}; 
  isUpdate: boolean = false;

  constructor(
    private activatesRoute: ActivatedRoute,
    private pendingService: PendingService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPending();
  }

  getPending() {
    let id = this.activatesRoute.snapshot.params['id'];
    // console.log('Este es el id', id);
    this.pendingService.getPending(id).subscribe(pending => this.pending = pending);
  }

  updatePending(newTopic: any) {
    // console.log('Editar el Asunto :', updateTopic);
    this.pending.topic = newTopic;
    this.pending.dateSelected = new Date();
    this.pendingService.update(this.pending).subscribe()
    this.isUpdate ? (this.isUpdate = false) : (this.isUpdate = true);
    this.router.navigate(['',]);

  }
}

