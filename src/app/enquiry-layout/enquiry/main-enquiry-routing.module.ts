import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnquiryComponent } from './components/enquiry/enquiry.component';


const routes: Routes = [
  { path: '', component: EnquiryComponent },
  { path: 'enquiry', component: EnquiryComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainEnquiryRoutingModule { }
