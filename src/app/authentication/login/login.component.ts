import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../services/login-service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ILoginModel } from '../../model/login.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  RoleList = [
    { value: 'Admin' },
    { value: 'User' },
  ]
  LoginModel: ILoginModel = <ILoginModel>{};
  uuidValue: string;
  constructor(private service: LoginServiceService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.LoginModel.role = '';
  }
  //check user login authentication and set login details to localstorage
  LoginAuthentication(formvalue, Form: NgForm) {
    this.service.LoginDetails(formvalue).subscribe(response => {
      if (response && response['status'] && response['data']) {
        localStorage.setItem('LoginDetails', JSON.stringify(response['data']));
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('loginToken', response['token']);
        this.router.navigate(['../../enquiry']);
      }
      else {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
      }

    })
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
