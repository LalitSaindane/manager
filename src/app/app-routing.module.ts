import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path:'',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path:'login',
    loadChildren: './login/login.module#LoginModule'
  },
  {
    path:'managerReg',
    loadChildren: './manager-reg/manager-reg.module#ManagerRegModule'
  },
  {
    path:'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
