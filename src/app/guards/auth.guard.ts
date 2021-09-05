import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthserviceService) {}

  canActivate(){
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.authService.redirectToLogin();
      return false;
    }
  }
}
