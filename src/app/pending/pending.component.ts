import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Pending } from '../pending';
import { PendingService } from '../pending.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  pendings: any;
  checkoutForm;

  constructor(
    formBuilder: FormBuilder,
    private pendingService: PendingService
  ) {
    this.checkoutForm = formBuilder.group({
      topic: '',
      dateSelected: Date,
    });
  }

  ngOnInit(): void {
    this.getPendings();
  }

  getPendings() {
    this.pendingService.getPendings().subscribe(pendings => this.pendings = pendings);
  }

  add(pending: any) {
    pending.dateSelected = new Date();
    if (pending.topic != '' && pending.topic != null) {
      // console.log('Pendiente nuevo', pending);
      this.pendingService.add(pending).subscribe(() => this.getPendings());
      this.checkoutForm.reset();
    }
  }

  delete(pending: Pending) {
    this.pendingService.delete(pending.id).subscribe(() => this.getPendings());
    // console.log('Elemento a eliminar', pending);
  }
}
