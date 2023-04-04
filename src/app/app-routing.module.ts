import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPendingComponent } from './detail-pending/detail-pending.component';
import { PendingComponent } from './pending/pending.component';

const routes: Routes = [
  { path: 'pending', component: PendingComponent },
  { path: 'detail/:id', component: DetailPendingComponent },
  { path: '', redirectTo: '/pending', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
