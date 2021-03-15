import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/authentication/login/login.module').then(m => m.LoginModule) },
  { path: 'login', loadChildren: () => import('../app/authentication/login/login.module').then(m => m.LoginModule) },
  { path: 'registration', loadChildren: () => import('../app/authentication/registration/registration.module').then(m => m.RegistrationModule) },
  { path: 'not-found', loadChildren: () => import('./errorComponent/not-found/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'enquiry', loadChildren: () => import('./enquiry-layout/enquiry/main-enquiry.module').then(m => m.MainEnquiryModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'not-found' } // call not-found component when user enterinvalid url

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
