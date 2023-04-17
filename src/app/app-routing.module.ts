import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPendingComponent } from './detail-pending/detail-pending.component';
import { PendingComponent } from './pending/pending.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
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
