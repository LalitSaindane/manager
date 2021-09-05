import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_PATTERN } from '../regex/regex';
import { RestApiService } from '../services/rest-api.service';
import { EncryptPasswordPipe } from '../pipes/encrypt-password.pipe';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manager-reg',
  templateUrl: './manager-reg.component.html',
  styleUrls: ['./manager-reg.component.scss']
})
export class ManagerRegComponent implements OnInit {
  public managerRegForm: FormGroup;
  isEmailIdInvalid:boolean = false;
  constructor(private formBuilder: FormBuilder,
              private apiService:RestApiService,
              private encryptPassword:EncryptPasswordPipe,
              private router:Router) { }

  ngOnInit() {

    this.managerRegForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern(EMAIL_PATTERN)]],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      password: ['',Validators.required],
      address: ['',Validators.required],
      birthdate: ['',Validators.required]
    });

  }

  onSubmit(){
    let birthdateObj = this.managerRegForm.value.birthdate;
    this.managerRegForm.value.birthdate = `${birthdateObj.year}-${birthdateObj.month}-${birthdateObj.day}`; 
    this.managerRegForm.value.id = this.apiService.randomIdGenerator();
    this.managerRegForm.value.password = this.encryptPassword.transform(this.managerRegForm.value.password);
   
    this.apiService.getManagerInfo().subscribe(
      (result:any)=>{
        let empObj = result.filter((item)=>item.email == this.managerRegForm.value.email);
        if(empObj.length == 0){
          this.apiService.postManagerInfo(this.managerRegForm.value).subscribe(
            (result)=>{
              this.router.navigate(['login']);
            },
            (error)=>{
            })
        }else{
          this.isEmailIdInvalid = true;
        }
      },
      (error)=>{
      }
    )
  }
}
