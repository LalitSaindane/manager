import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerRegComponent } from './manager-reg.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerRegComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ManagerRegRoutingModule { }
