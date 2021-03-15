import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EnquiryServiceService {

  constructor(private http: HttpClient) { }

  insertEnquiry(regForm) {
    let data = {
      subject: regForm.subject,
      courseName: regForm.courseName,
      enquiryDetails: regForm.enquiryDetails,
      createdBy: regForm.regid
    }
    return this.http.post(`${environment.localAPI}api/insertEnquiry`, data);
  }

  getEnquiryByUser(id) {
    return this.http.get(`${environment.localAPI}api/getEnquiryByUser/${id}`);
  }

  getAllEnquiry() {
    return this.http.get(`${environment.localAPI}api/getAllUserEnquiry`);
  }
  updateEnquiry(data) {
    return this.http.put(`${environment.localAPI}api/updateEnquiryDetails/${data._id}`, data);
  }
  deleteEnquiryService(data) {
    return this.http.put(`${environment.localAPI}api/deleteEnquiry/${data._id}`, data);
  }
  getTodaysEnquiry(date) {
    return this.http.get(`${environment.localAPI}api/getTodaysEnquiry/${date}`);
  }
}
