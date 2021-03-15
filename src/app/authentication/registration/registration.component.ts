import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRegistrationModel } from '../../model/registration.model';
import { RegistrationServiceService } from '../../services/registration-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  genderList = [
    { value: 'Male' },
    { value: 'Female' },
  ]
  RoleList = [
    { value: 'Admin' },
    { value: 'User' },
  ]
  courseNameList =[
    {value:'BE'},
    {value:'MCA'},
    {value:'MBA'},
    {value:'BCA'},
    {value:'BCS'},
    {value:'MSC'},
    {value:'HM'},
    {value:'BSC'}
  ]
  RegistrationModel: IRegistrationModel = <IRegistrationModel>{};
  uuidValue: string;
  constructor(private service: RegistrationServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.RegistrationModel.role = '';
    this.RegistrationModel.courseName = '';
  }
  //insert new registration form details in collection
  CreateRegistration(regForm, form: NgForm) {
    regForm['regid'] = UUID.UUID();
    this.service.CreateRegistration(regForm).subscribe(response => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        form.reset();
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
