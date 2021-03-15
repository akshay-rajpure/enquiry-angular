import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {

  constructor(private http: HttpClient) { }
  CreateRegistration(regForm) {
    let data = {
      regid: regForm.regid,
      firstname: regForm.firstname,
      lastname: regForm.lastname,
      phone: regForm.phone,
      email: regForm.email,
      gender: regForm.gender,
      courseName: regForm.courseName,
      password: regForm.password,
    }
    return this.http.post(`${environment.localAPI}api/registration`, data);
  }
}
