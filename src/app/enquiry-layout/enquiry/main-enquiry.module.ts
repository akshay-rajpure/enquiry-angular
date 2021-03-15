import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainEnquiryRoutingModule } from './main-enquiry-routing.module';
import { MainEnquiryComponent } from './main-enquiry.component';
import { SharedComponentModule } from '../../shared/components/shared-component/shared-component.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EnquiryComponent } from './components/enquiry/enquiry.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [MainEnquiryComponent, EnquiryComponent],
  imports: [
    CommonModule,
    MainEnquiryRoutingModule,
    SharedComponentModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    MatSnackBarModule,
    ModalModule
  ]
})
export class MainEnquiryModule { }
