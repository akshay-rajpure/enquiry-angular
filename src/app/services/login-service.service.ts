import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  LoginDetails(loginModel) {
    let data = {
      email: loginModel.email,
      password: loginModel.password,
      role: loginModel.role,
    }
    return this.http.post(`${environment.localAPI}api/login`, data);
  }
}
