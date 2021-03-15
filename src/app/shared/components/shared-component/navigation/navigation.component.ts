import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  loggedInuserDetails: any; 
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.loggedInuserDetails = JSON.parse(localStorage.getItem('LoginDetails'));
  }
  //on menu click route component
  onMenuClick(Input) {
    switch (Input) {
      case 'search-blood-group':
        this.router.navigate(['../../bloodbank/search-blood-group']);
        break;
      case 'blood-donors':
        this.router.navigate(['../../bloodbank/blood-donor']);
        break;
      case 'enquiry':
        this.router.navigate(['../../bloodbank/enquiry']);
        break;
    }
  }
  // on logout remove localstorage data and navigate to login page
  logout() {
    localStorage.removeItem('LoginDetails');
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('loginToken');
    this.router.navigate(['']);
  }
}
