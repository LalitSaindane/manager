import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRegRoutingModule } from './manager-reg-routing.module';
import { ManagerRegComponent } from './manager-reg.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ManagerRegComponent],
  imports: [
    CommonModule,
    ManagerRegRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ]
})
export class ManagerRegModule { }
