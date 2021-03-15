import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IEnquiryModel } from '../../../../model/enquiry.model';
import { EnquiryServiceService } from '../../../../services/enquiry-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {
  @ViewChild('confirmationModal', { static: false }) confirmationModal: ModalDirective;
  @ViewChild('enquiryModal', { static: false }) enquiryModal: ModalDirective;

  EnquiryModel: IEnquiryModel = <IEnquiryModel>{};
  courseNameList = [
    { value: 'BE' },
    { value: 'MCA' },
    { value: 'MBA' },
    { value: 'BCA' },
    { value: 'BCS' },
    { value: 'MSC' },
    { value: 'HM' },
    { value: 'BSC' }
  ]
  genderList = [
    { value: 'Male' },
    { value: 'Female' },
  ]
  statusList = [
    { value: 'Pending' },
    { value: 'Closed' }
  ]
  heading: string;
  isUpdate: boolean = false;
  loggedInuserDetails: any;
  allEnquiry: any = [];
  searchTable: any;
  enquiryPagination: number
  storeDeleteData: object = {};
  todaysEnquiry: any = [];
  tdyenquiryPagination: number;
  isDisabled: boolean;

  constructor(private service: EnquiryServiceService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedInuserDetails = JSON.parse(localStorage.getItem('LoginDetails'));
    this.heading = "Create New Enquiry";
    this.EnquiryModel.courseName = '';
    (this.loggedInuserDetails && this.loggedInuserDetails.role === 'User') ? this.getEnqByLoginUser() : this.getUserEnq();
  }
  getUserEnq() {
    this.service.getAllEnquiry().subscribe((response) => {
      response ? this.allEnquiry = response : this.allEnquiry = [];
    });
    this.getTodaysEnquiry();
  }
  getEnqByLoginUser() {
    this.service.getEnquiryByUser(this.loggedInuserDetails['regid']).subscribe((response) => {
      response ? this.allEnquiry = response : this.allEnquiry = [];
    })
  }
  getTodaysEnquiry() {
    this.service.getTodaysEnquiry(new Date().toISOString().split('T')[0]).subscribe((response) => {
      if (response && response['status'] && response['data'].length > 0) {
        this.todaysEnquiry = response['data'];
      }
      else {
        this.todaysEnquiry = [];
      }
    })
  }
  openAddEnqModal(form: NgForm) {
    this.enquiryModal.show();
    this.EnquiryModel = <IEnquiryModel>{};
    form.reset();
  }
  CreateEnquiry(formData, form: NgForm) {
    (this.loggedInuserDetails && this.loggedInuserDetails.regid) ? formData['regid'] = this.loggedInuserDetails.regid : null;
    this.service.insertEnquiry(formData).subscribe((response) => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        form.reset();
        this.getEnqByLoginUser();
        this.enquiryModal.hide();
      }
      else
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
    });
  }
  editEnquiry(data, input) {
    this.EnquiryModel = data;
    this.heading = 'Update Enquiry Details';
    this.isUpdate = true;
    this.enquiryModal.show();
    if (input === 'readonly') {
      this.isDisabled = true;
      this.heading = 'Enquiry Details';
    } else {
      this.isDisabled = false;
      this.heading = 'Update Enquiry Details';
    }
  }
  openModal(data) {
    data['deletedBy'] = this.loggedInuserDetails.regid;
    (data && data._id) ? this.storeDeleteData = data : this.storeDeleteData = null;
    this.confirmationModal.show();
  }

  deleteEnquiry() {
    this.service.deleteEnquiryService(this.storeDeleteData).subscribe((response) => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        this.getUserEnq();
        this.confirmationModal.hide();
        this.storeDeleteData = [];
      }
      else this.snackBar.open(response['message'], 'Close', { duration: 5000 });
    })
  }
  UpdateEnquiry(form: NgForm) {
    this.EnquiryModel['updatedBy'] = this.loggedInuserDetails.regid;
    this.EnquiryModel['status'] = 'Closed';
    this.service.updateEnquiry(this.EnquiryModel).subscribe((response) => {
      if (response && response['status']) {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
        form.reset();
        this.EnquiryModel = <IEnquiryModel>{};
        this.getUserEnq();
        this.enquiryModal.hide();
      }
      else {
        this.snackBar.open(response['message'], 'Close', { duration: 5000 });
      }
    });

  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
