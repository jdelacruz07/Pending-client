import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Pending } from '../pending';
import { PendingService } from '../pending.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css'],
})
export class PendingComponent implements OnInit {
  pendings: Pending[] = [];
  checkoutForm: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private pendingService: PendingService, private appService: AppService) {
  }


  ngOnInit(): void {
    this.getPendings();
    this.checkoutForm = this.formBuilder.group({ topic: '', dateSelected: new Date(), });
  }


  getPendings() {
    this.pendingService.getPendings().subscribe(pendings => {
      let newPendings: any = pendings;
      this.pendings = newPendings;
      console.log(`Total de pendiente ${this.pendings.length}`);
    }, error => console.log(error));
  }


  add(pendingForm: any) {
    let username: any = this.appService.username;
    console.log("Este es el usuario ", username)
    if (pendingForm.topic != '' && pendingForm.topic != null) {
      let newPending: Pending = { id: null, username: username, topic: pendingForm.topic, dateSelected: new Date(), reference: null }
      this.pendingService.addPending(newPending).subscribe(() => {
        this.getPendings()
        this.checkoutForm.reset();
      }, error => {
        console.log("Existe error", error);
        this.router.navigateByUrl("/login");
      });
    }
  }

}
