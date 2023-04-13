import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Pending } from '../pending';
import { PendingService } from '../pending.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  [x: string]: any;
  pendings: Pending[] = [];
  checkoutForm;

  constructor(
    formBuilder: FormBuilder,
    private pendingService: PendingService,
    private app: AppService
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
      let newPendings:any = pendings
      this.pendings = newPendings;
      console.log(`Total de pendiente ${this.pendings.length}`);
    });
  }

  add(pendingForm: any) {
    let username = this.app.username;
    console.log("Este es el usuario ", username)
    if (pendingForm.topic != '' && pendingForm.topic != null) {
      let newPending: any = { username: username, topic: pendingForm.topic, dateSelected: new Date() }
      console.log("Pendiente a insertar ", newPending)
      this.pendingService.add(newPending).subscribe(() => {
        this.getPendings()
        this.checkoutForm.reset();
      });
    }
  }


}
