import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedInuserDetails: any; 
  constructor(private router: Router) { }
//check user is loggedin or not and route as per authentication
  canActivate() {
      if (localStorage.getItem('isLoggedin')) {
          this.loggedInuserDetails = JSON.parse(localStorage.getItem('LoginDetails'));
          if (this.loggedInuserDetails) {
              return true;
          }
      }

      this.router.navigate(['/login']);
      return false;
  }
}
