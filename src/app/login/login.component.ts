import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../services/authservice.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,DoCheck {
 
  public loginForm: FormGroup;
  public InvalidUsernameAndPassowrd : boolean = false;
  public error:boolean = false;
  constructor(private formBuilder: FormBuilder,
              private authService:AuthserviceService
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required]
    });

  }

  ngDoCheck(){
    this.error = this.authService.errorMessage;
  }

  onSubmit(){
    this.authService.checkUserNamePassword(this.loginForm.value.email,this.loginForm.value.password);
  }

}
