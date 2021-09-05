import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestApiService } from '../services/rest-api.service';
import swal  from 'sweetalert2';
import { MOBILE_PATTERN } from '../regex/regex';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public employeeRegForm: FormGroup;
  @ViewChild('content') content:ElementRef;
  public profile:string = "Create Profile"; 
  public employeeId:number;

  constructor(private formBuilder: FormBuilder,
              private apiService:RestApiService,
              private modalService: NgbModal) { }

  ngOnInit() {

    this.employeeRegForm = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      address: ['',Validators.required],
      birthdate: ['',Validators.required],
      mobile: ['',[Validators.required,Validators.pattern(MOBILE_PATTERN)]],
      city: ['',Validators.required],
    });

  }

  open(content:ElementRef,profileType?: string) {
    if(profileType != 'Update'){
      this.profile = 'Create Profile'; 
      this.employeeRegForm.reset();
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {}, (reason) => {
    });
  }

  onSubmit(){
    let birthdateObj = this.employeeRegForm.value.birthdate;
    this.employeeRegForm.value.birthdate = `${birthdateObj.year}-${birthdateObj.month}-${birthdateObj.day}`; 
    if(this.profile == 'Create Profile'){
      this.employeeRegForm.value.id = this.apiService.randomIdGenerator();
      this.apiService.postEmployeeInfo(this.employeeRegForm.value).subscribe(
        (result)=>{},
        (error)=>{}
      )
    }else{
      swal({
        title: 'Update Employee Information?',
        text: 'Warning: This action cannot be undone',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#90ee90',
        cancelButtonColor: '#bdc3c7',
        confirmButtonText: 'Yes, update it',
        cancelButtonText: 'No, Keep it',
        reverseButtons: true,
      }).then((output)=>{
        if(output && output['value']){
          this.apiService.putSingleEmployeeInfo(this.employeeId,this.employeeRegForm.value).subscribe(
            (result)=>{},
            (error)=>{}
          )
        }
      });
    }
  }

  updateEmployeeId(id){
    this.employeeId = id
    this.apiService.getSingleEmployee(this.employeeId).subscribe(
      (result:any)=>{
      this.profile = 'Update Profile';
       let year,month,day;
       [year,month,day] = result.birthdate.split('-');
       this.employeeRegForm.patchValue({firstName: result.firstName, lastName:result.lastName, address: result.address, birthdate: {'day':Number(day),'month':Number(month),'year':Number(year)}, mobile: result.mobile, city: result.city})
       this.open(this.content,'Update');
      },
      (error)=>{}
    )
  }
}
