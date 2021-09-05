import { Component, OnInit,DoCheck } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { Output, EventEmitter } from '@angular/core';
import swal  from 'sweetalert2';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit,DoCheck {
  rows;
  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private apiService:RestApiService) { }

  ngOnInit() {
    this.apiService.getListOfEmployee().subscribe(
      (result)=>{
        this.rows = result;
      },
      (error)=>{

      }
    )  
  }

  ngDoCheck(){
    this.apiService.getListOfEmployee().subscribe(
      (result)=>{
        this.rows = result;
      },
      (error)=>{

      }
    )  
  }

  updateEmployee(employeeId:number){
   this.newItemEvent.emit(employeeId);
  }

  deleteEmployee(employeeId:number){
    swal({
      title: 'Delete Employee Information?',
      text: 'Warning: This action cannot be undone',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#E74c3c',
      cancelButtonColor: '#bdc3c7',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, Keep it',
      reverseButtons: true,
    }).then((output)=>{
      if(output && output['value']){
        this.apiService.deleteEmployeeInfo(employeeId).subscribe(
          (result)=>{
            this.rows = result;
            console.log("result");
            console.log(result);
          },
          (error)=>{
    
          }
        )
      }
    });
  }
}
