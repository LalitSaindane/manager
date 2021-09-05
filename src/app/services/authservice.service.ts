import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  validUser: boolean = false;
  errorMessage: boolean = false;
  constructor(private restApiService: RestApiService,
    private router: Router) { }

  checkUserNamePassword(email, password) {
    this.restApiService.getManager(email).subscribe(
      (result: any) => {
        if (result.length > 0) {
          let pass = result[0].password;
          let bytes = CryptoJS.AES.decrypt(pass, 'secret key 123');
          var decryptPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          if (decryptPassword == password && email == email) {
            this.validUser = true
            this.router.navigate(['home']);
          }else{
            this.errorMessage = true;
          }
        } else {
          this.errorMessage = true;
        }
      },
      (error) => {

      }
    )
  }

  isLoggedIn() {
    if (this.validUser) {
      return true;
    } else {
      return false;
    }
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

}
