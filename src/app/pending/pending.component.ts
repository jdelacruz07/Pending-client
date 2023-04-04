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
  pendings: Pending[] = [];
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
    this.pendingService.getPendings().subscribe(pendings => {
      this.pendings = pendings
      console.log(`Total de pendiente ${this.pendings.length}`);
      // this.pendings.forEach( x => console.log(x))

    });
  }

  add(pendingForm: any) {
    if (pendingForm.topic != '' && pendingForm.topic != null) {
      let newPending: any = { topic: pendingForm.topic, dateSelected: new Date() }
      this.pendingService.add(newPending).subscribe(() => this.getPendings());
      this.checkoutForm.reset();
    }
  }


}
